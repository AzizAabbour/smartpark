import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUsers } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smartpark_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
    // Default to the demo customer Alex Rivera for instant seamless testing
    return initialUsers[1];
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('smartpark_users_list');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('smartpark_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('smartpark_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('smartpark_users_list', JSON.stringify(users));
  }, [users]);

  const login = (email, password, remember = true) => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      if (foundUser.status === 'Inactive') {
        throw new Error('This account has been deactivated. Please contact support.');
      }
      setCurrentUser(foundUser);
      return foundUser;
    }
    // If not found in mock, create a dummy session
    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: email.split('@')[0].replace('.', ' '),
      email: email,
      role: email.includes('admin') ? 'admin' : 'user',
      phone: '+1 (555) 000-1122',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      status: 'Active',
      registeredAt: new Date().toISOString(),
      totalBookings: 0
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const register = (userData) => {
    const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      throw new Error('An account with this email address already exists.');
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      role: userData.email.includes('admin') ? 'admin' : 'user',
      phone: userData.phone || '+1 (555) 123-4567',
      vehiclePlate: userData.vehiclePlate || '7NEW999',
      vehicleModel: userData.vehicleModel || 'Electric Sedan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      status: 'Active',
      registeredAt: new Date().toISOString(),
      totalBookings: 0
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smartpark_user');
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updatedFields };
      setUsers(all => all.map(u => u.id === prev.id ? updated : u));
      return updated;
    });
  };

  // Toggle user role between user and admin easily for demo testing
  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      const admin = users.find(u => u.role === 'admin') || initialUsers[0];
      setCurrentUser(admin);
    } else {
      const demoUser = users.find(u => u.role === 'user') || initialUsers[1];
      setCurrentUser(demoUser);
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        if (currentUser && currentUser.id === userId) {
          setCurrentUser({ ...currentUser, status: nextStatus });
        }
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      login,
      register,
      logout,
      updateProfile,
      switchRole,
      toggleUserStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

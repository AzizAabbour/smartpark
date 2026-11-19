import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialParkingFacilities,
  initialParkingSpaces,
  initialReservations,
  initialNotifications,
  initialRevenueStats
} from '../data/mockData';

const ParkingContext = createContext(null);

export const ParkingProvider = ({ children }) => {
  // Facilities State
  const [facilities, setFacilities] = useState(() => {
    const saved = localStorage.getItem('smartpark_facilities');
    return saved ? JSON.parse(saved) : initialParkingFacilities;
  });

  // Spaces State
  const [spaces, setSpaces] = useState(() => {
    const saved = localStorage.getItem('smartpark_spaces');
    return saved ? JSON.parse(saved) : initialParkingSpaces;
  });

  // Reservations State
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('smartpark_reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('smartpark_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Analytics & Stats State
  const [revenueStats, setRevenueStats] = useState(() => {
    const saved = localStorage.getItem('smartpark_revenue_stats');
    return saved ? JSON.parse(saved) : initialRevenueStats;
  });

  // System Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('smartpark_settings');
    return saved ? JSON.parse(saved) : {
      appName: 'SmartPark System',
      currency: 'USD ($)',
      taxRate: 8.5,
      autoConfirmBookings: true,
      emailNotifications: true,
      smsNotifications: false,
      gracePeriodMinutes: 15,
      cancellationCutoffHours: 2,
      platformFee: 1.50
    };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('smartpark_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('smartpark_spaces', JSON.stringify(spaces));
  }, [spaces]);

  useEffect(() => {
    localStorage.setItem('smartpark_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('smartpark_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('smartpark_revenue_stats', JSON.stringify(revenueStats));
  }, [revenueStats]);

  useEffect(() => {
    localStorage.setItem('smartpark_settings', JSON.stringify(settings));
  }, [settings]);

  // Recalculate facility available spaces whenever spaces change
  useEffect(() => {
    setFacilities(prevFacilities => {
      return prevFacilities.map(fac => {
        const facSpaces = spaces.filter(s => s.facilityId === fac.id);
        if (facSpaces.length > 0) {
          const avail = facSpaces.filter(s => s.status === 'Available').length;
          return {
            ...fac,
            totalSpaces: Math.max(fac.totalSpaces, facSpaces.length),
            availableSpaces: avail
          };
        }
        return fac;
      });
    });
  }, [spaces]);

  // --- Facilities CRUD ---
  const addFacility = (newFac) => {
    const facility = {
      ...newFac,
      id: `park-${Date.now()}`,
      slug: newFac.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 1,
      availableSpaces: Number(newFac.totalSpaces || 50),
      totalSpaces: Number(newFac.totalSpaces || 50),
      reviews: []
    };
    setFacilities(prev => [facility, ...prev]);

    // Create 10 default spaces automatically for this new facility
    const generatedSpaces = Array.from({ length: 8 }, (_, i) => ({
      id: `sp-${Date.now()}-${i + 1}`,
      facilityId: facility.id,
      spaceNumber: `A-${String(i + 1).padStart(2, '0')}`,
      floor: "Ground",
      type: i === 2 ? "EV Charging" : i === 4 ? "Accessible" : "Standard",
      status: "Available",
      rateMultiplier: i === 2 ? 1.25 : 1.0,
      vehiclePlate: null
    }));
    setSpaces(prev => [...generatedSpaces, ...prev]);
    return facility;
  };

  const updateFacility = (id, updatedData) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, ...updatedData } : f));
  };

  const deleteFacility = (id) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
    setSpaces(prev => prev.filter(s => s.facilityId !== id));
    setReservations(prev => prev.filter(r => r.facilityId !== id));
  };

  // --- Spaces CRUD ---
  const addSpace = (newSpace) => {
    const space = {
      ...newSpace,
      id: `sp-${Date.now()}`,
      rateMultiplier: Number(newSpace.rateMultiplier || 1.0)
    };
    setSpaces(prev => [space, ...prev]);
    return space;
  };

  const updateSpace = (id, updatedData) => {
    setSpaces(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteSpace = (id) => {
    setSpaces(prev => prev.filter(s => s.id !== id));
  };

  const updateSpaceStatus = (id, newStatus, vehiclePlate = null) => {
    setSpaces(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: newStatus,
          vehiclePlate: newStatus === 'Occupied' ? vehiclePlate || s.vehiclePlate : (newStatus === 'Available' ? null : s.vehiclePlate)
        };
      }
      return s;
    }));
  };

  // --- Reservations CRUD ---
  const createReservation = (bookingData, user) => {
    const refNumber = `SP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes = {
      id: `res-${Date.now()}`,
      reference: refNumber,
      userId: user.id,
      userName: user.fullName,
      userEmail: user.email,
      facilityId: bookingData.facilityId,
      facilityName: bookingData.facilityName,
      spaceId: bookingData.spaceId || null,
      spaceNumber: bookingData.spaceNumber || "Auto-assigned",
      spaceType: bookingData.spaceType || "Standard",
      vehiclePlate: bookingData.vehiclePlate,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      durationHours: bookingData.durationHours,
      totalPrice: bookingData.totalPrice,
      status: "Upcoming",
      paymentStatus: "Paid",
      paymentMethod: bookingData.paymentMethod || "Credit Card",
      bookedAt: new Date().toISOString()
    };

    setReservations(prev => [newRes, ...prev]);

    // If a specific space was booked, mark it as Reserved
    if (bookingData.spaceId) {
      updateSpaceStatus(bookingData.spaceId, 'Reserved', bookingData.vehiclePlate);
    }

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId: user.id,
      title: "Reservation Confirmed",
      message: `Your booking at ${bookingData.facilityName} (${refNumber}) has been confirmed!`,
      time: "Just now",
      read: false,
      type: "success"
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Update revenue stats
    setRevenueStats(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + bookingData.totalPrice,
      netIncome: prev.netIncome + bookingData.totalPrice
    }));

    return newRes;
  };

  const cancelReservation = (reservationId) => {
    const target = reservations.find(r => r.id === reservationId);
    if (!target) return;

    setReservations(prev => prev.map(r => {
      if (r.id === reservationId) {
        return { ...r, status: 'Cancelled', paymentStatus: 'Refunded' };
      }
      return r;
    }));

    // Free the space if it was reserved
    if (target.spaceId) {
      updateSpaceStatus(target.spaceId, 'Available', null);
    }

    // Notify
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId: target.userId,
      title: "Reservation Cancelled",
      message: `Booking ${target.reference} has been cancelled and refunded.`,
      time: "Just now",
      read: false,
      type: "warning"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateReservationStatus = (id, newStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = (userId) => {
    setNotifications(prev => prev.filter(n => n.userId !== userId));
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Aggregated live KPIs
  const totalFacilities = facilities.length;
  const totalSpacesCount = facilities.reduce((acc, f) => acc + (f.totalSpaces || 0), 0);
  const availableSpacesCount = facilities.reduce((acc, f) => acc + (f.availableSpaces || 0), 0);
  const occupiedSpacesCount = Math.max(0, totalSpacesCount - availableSpacesCount);
  const occupancyRate = totalSpacesCount > 0 ? Math.round((occupiedSpacesCount / totalSpacesCount) * 100) : 0;
  const activeReservationsCount = reservations.filter(r => r.status === 'Active' || r.status === 'Upcoming').length;

  return (
    <ParkingContext.Provider value={{
      facilities,
      spaces,
      reservations,
      notifications,
      revenueStats,
      settings,
      kpis: {
        totalFacilities,
        totalSpacesCount,
        availableSpacesCount,
        occupiedSpacesCount,
        occupancyRate,
        activeReservationsCount
      },
      addFacility,
      updateFacility,
      deleteFacility,
      addSpace,
      updateSpace,
      deleteSpace,
      updateSpaceStatus,
      createReservation,
      cancelReservation,
      updateReservationStatus,
      markNotificationAsRead,
      clearAllNotifications,
      updateSettings
    }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) throw new Error('useParking must be used within a ParkingProvider');
  return context;
};

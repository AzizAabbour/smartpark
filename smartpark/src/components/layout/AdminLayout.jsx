import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useParking } from '../../contexts/ParkingContext';
import {
  DashboardIcon,
  ViewGridIcon,
  LayersIcon,
  CalendarIcon,
  PersonIcon,
  BarChartIcon,
  GearIcon,
  ExitIcon,
  BellIcon,
  MagnifyingGlassIcon,
  DotFilledIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons';
import './adminLayout.css';

export const AdminLayout = ({ children, pageTitle = 'Dashboard' }) => {
  const { currentUser, logout, switchRole } = useAuth();
  const { notifications, markNotificationAsRead } = useParking();
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter(n => !n.read);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-brand">
            <div className="brand-logo-icon">
              <span className="brand-logo-letter">P</span>
            </div>
            <div className="admin-brand-text">
              <span className="admin-brand-name">Smart<span className="brand-highlight">Park</span></span>
              <span className="admin-brand-badge">Admin Suite</span>
            </div>
          </Link>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-group-title">MAIN NAVIGATION</div>
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <DashboardIcon width={18} height={18} />
            <span>Overview</span>
          </NavLink>

          <NavLink to="/admin/parking" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <ViewGridIcon width={18} height={18} />
            <span>Facilities</span>
          </NavLink>

          <NavLink to="/admin/spaces" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <LayersIcon width={18} height={18} />
            <span>Parking Spaces</span>
          </NavLink>

          <NavLink to="/admin/reservations" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <CalendarIcon width={18} height={18} />
            <span>Reservations</span>
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <PersonIcon width={18} height={18} />
            <span>User Management</span>
          </NavLink>

          <div className="admin-nav-group-title">ANALYTICS & SYSTEM</div>
          <NavLink to="/admin/reports" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <BarChartIcon width={18} height={18} />
            <span>Reports & Analytics</span>
          </NavLink>

          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <GearIcon width={18} height={18} />
            <span>System Settings</span>
          </NavLink>
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-card">
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
              alt="Admin Profile" 
              className="admin-avatar"
            />
            <div className="admin-user-details">
              <span className="admin-user-name">{currentUser?.fullName || 'Admin User'}</span>
              <span className="admin-user-status">
                <DotFilledIcon className="text-success" /> Online (Admin)
              </span>
            </div>
          </div>
          <div className="sidebar-bottom-actions">
            <Link to="/" className="sidebar-portal-btn" title="View Public Website">
              <ExternalLinkIcon width={15} height={15} /> Public Site
            </Link>
            <button onClick={handleLogout} className="sidebar-logout-btn" title="Sign Out">
              <ExitIcon width={16} height={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Administrative Body */}
      <div className="admin-main-wrapper">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1 className="admin-page-title">{pageTitle}</h1>
          </div>

          <div className="topbar-right">
            {/* Quick Public Preview button */}
            <Link to="/" className="btn btn-outline btn-sm">
              <ExternalLinkIcon /> View Website
            </Link>

            {/* Quick Switch Persona button */}
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => switchRole('user')}
              title="Switch to customer persona"
            >
              Switch to Customer View
            </button>

            {/* Notification Badge */}
            <div className="admin-notif-btn-wrapper">
              <button className="icon-action-btn" title="System Notifications">
                <BellIcon width={19} height={19} />
                {unreadNotifications.length > 0 && (
                  <span className="notif-badge">{unreadNotifications.length}</span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content Pane */}
        <main className="admin-page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

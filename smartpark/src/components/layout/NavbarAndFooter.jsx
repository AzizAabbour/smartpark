import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  PersonIcon, 
  ExitIcon, 
  DashboardIcon, 
  GearIcon, 
  HamburgerMenuIcon, 
  Cross2Icon,
  SewingPinIcon,
  BackpackIcon
} from '@radix-ui/react-icons';
import './layout.css';

export const Navbar = () => {
  const { currentUser, isAuthenticated, isAdmin, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-icon">
            <span className="brand-logo-letter">P</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-name">Smart<span className="brand-highlight">Park</span></span>
            <span className="brand-tagline">Smart Parking Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/find-parking" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
            Find Parking
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
            Contact
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
              My Bookings
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link nav-link-admin ${isActive ? 'nav-link-active' : ''}`}>
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Right Action / Auth Buttons */}
        <div className="navbar-actions">
          {/* Quick Role Switcher Button for instant demo testing */}
          <div className="demo-role-badge">
            <button 
              className="role-toggle-btn"
              title="Click to toggle between Admin and Customer persona"
              onClick={() => switchRole(isAdmin ? 'user' : 'admin')}
            >
              Mode: <strong>{isAdmin ? 'Admin' : 'User'}</strong> ⇄
            </button>
          </div>

          {isAuthenticated ? (
            <div className="user-menu-wrapper">
              <button 
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-expanded={userDropdownOpen}
              >
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                  alt={currentUser.fullName} 
                  className="user-avatar-sm"
                />
                <span className="user-name-label">{currentUser.fullName}</span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown-card card" onClick={() => setUserDropdownOpen(false)}>
                  <div className="dropdown-user-info">
                    <p className="dropdown-user-name">{currentUser.fullName}</p>
                    <p className="dropdown-user-email">{currentUser.email}</p>
                    <span className="badge badge-info">{currentUser.role}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/dashboard" className="dropdown-item">
                    <DashboardIcon /> User Dashboard
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="dropdown-item dropdown-item-admin">
                      <GearIcon /> Admin Dashboard
                    </Link>
                  )}
                  <Link to="/find-parking" className="dropdown-item">
                    <SewingPinIcon /> Reserve a Spot
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item dropdown-item-danger">
                    <ExitIcon /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns-group">
              <Link to="/login" className="btn btn-outline btn-sm">
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <Cross2Icon width={22} height={22} /> : <HamburgerMenuIcon width={22} height={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-container">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link" end>
            Home
          </NavLink>
          <NavLink to="/find-parking" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
            Find Parking
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
            Contact
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              My Bookings
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link text-primary">
              Admin Portal
            </NavLink>
          )}
          {!isAuthenticated && (
            <div className="mobile-auth-row">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline w-100">
                Log In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-100">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <div className="navbar-brand">
            <div className="brand-logo-icon">
              <span className="brand-logo-letter">P</span>
            </div>
            <div className="brand-text-block">
              <span className="brand-name">Smart<span className="brand-highlight">Park</span></span>
              <span className="brand-tagline">Smart Parking Platform</span>
            </div>
          </div>
          <p className="footer-tagline">
            Empowering drivers and parking operators with real-time slot intelligence, contactless booking, and seamless smart mobility.
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} SmartPark SaaS Inc. All rights reserved.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><Link to="/find-parking">Find Parking</Link></li>
            <li><Link to="/find-parking">Interactive Map</Link></li>
            <li><Link to="/dashboard">Reservation History</Link></li>
            <li><Link to="/admin">Operator System</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Solutions</h4>
          <ul className="footer-links">
            <li><a href="#features">EV Fast Charging</a></li>
            <li><a href="#features">Automated ANPR</a></li>
            <li><a href="#features">Occupancy Heatmaps</a></li>
            <li><a href="#features">Fleet Enterprise</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Contact & Support</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Help & FAQs</Link></li>
            <li><a href="mailto:support@smartpark.com">support@smartpark.com</a></li>
            <li><span>+1 (800) 555-PARK</span></li>
            <li><span>Financial District, San Francisco</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParking } from '../../contexts/ParkingContext';
import { ParkingCard } from '../../components/parking/ParkingCard';
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  ClockIcon, 
  CheckCircledIcon,
  ShieldCheckIcon,
  LightningBoltIcon,
  BarChartIcon,
  StarFilledIcon,
  ArrowRightIcon,
  SewingPinIcon
} from '@radix-ui/react-icons';
import './home.css';

export const HomePage = () => {
  const { facilities, kpis } = useParking();
  const navigate = useNavigate();

  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('2026-11-20');
  const [searchTime, setSearchTime] = useState('10:00');
  const [filterType, setFilterType] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/find-parking?location=${encodeURIComponent(searchLocation)}&type=${filterType}`);
  };

  const featured = facilities.slice(0, 3);

  return (
    <div className="home-page-root">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              <span>Next-Gen Parking Intelligence</span>
            </div>
            <h1 className="hero-headline">
              Find Your Perfect <br />
              <span className="text-gradient">Parking Spot,</span> Anytime.
            </h1>
            <p className="hero-subtext">
              Eliminate circling the block. Search 1,000+ available live parking spots, reserve guaranteed EV stalls, and experience seamless contactless entry.
            </p>

            {/* Interactive Search Bar Widget */}
            <form className="hero-search-bar card" onSubmit={handleSearchSubmit}>
              <div className="search-field">
                <label className="search-label">
                  <SewingPinIcon /> Destination / City
                </label>
                <input
                  type="text"
                  placeholder="San Francisco, SOMA, Downtown..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="search-field-divider"></div>

              <div className="search-field">
                <label className="search-label">
                  <CalendarIcon /> Arrival Date
                </label>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="search-field-divider"></div>

              <div className="search-field">
                <label className="search-label">
                  <ClockIcon /> Arrival Time
                </label>
                <input
                  type="time"
                  value={searchTime}
                  onChange={(e) => setSearchTime(e.target.value)}
                  className="search-input"
                />
              </div>

              <button type="submit" className="btn btn-primary search-submit-btn">
                <MagnifyingGlassIcon width={18} height={18} />
                <span>Search Parking</span>
              </button>
            </form>

            {/* Quick Stats Micro Strip */}
            <div className="hero-quick-stats">
              <div className="quick-stat-item">
                <strong>{kpis.totalFacilities}</strong>
                <span>Smart Facilities</span>
              </div>
              <div className="quick-stat-divider">•</div>
              <div className="quick-stat-item">
                <strong className="text-success">{kpis.availableSpacesCount}</strong>
                <span>Open Spaces Now</span>
              </div>
              <div className="quick-stat-divider">•</div>
              <div className="quick-stat-item">
                <strong>99.4%</strong>
                <span>Driver Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Parking Facilities */}
      <section className="section-padding featured-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-tag">PREMIUM LOCATIONS</span>
              <h2 className="section-title">Featured Parking Lots</h2>
              <p className="section-subtitle">Guaranteed safe, covered, and high-tech parking options near key city destinations.</p>
            </div>
            <Link to="/find-parking" className="btn btn-outline view-all-btn">
              Explore All Facilities <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid-3">
            {featured.map((facility) => (
              <ParkingCard key={facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding how-it-works-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">SIMPLE WORKFLOW</span>
            <h2 className="section-title">How SmartPark Works</h2>
            <p className="section-subtitle">Park in 3 simple steps without wasting time or fuel.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card card">
              <div className="step-number">01</div>
              <div className="step-icon-box">
                <MagnifyingGlassIcon width={28} height={28} />
              </div>
              <h3 className="step-title">Find & Compare</h3>
              <p className="step-desc">
                Browse real-time parking availability on our interactive map with transparent hourly rates and EV status.
              </p>
            </div>

            <div className="step-card card">
              <div className="step-number">02</div>
              <div className="step-icon-box">
                <CalendarIcon width={28} height={28} />
              </div>
              <h3 className="step-title">Reserve Spot</h3>
              <p className="step-desc">
                Pick your specific arrival time window and preferred space type. Instant confirmation with zero hidden fees.
              </p>
            </div>

            <div className="step-card card">
              <div className="step-number">03</div>
              <div className="step-icon-box">
                <ShieldCheckIcon width={28} height={28} />
              </div>
              <h3 className="step-title">Park & Go</h3>
              <p className="step-desc">
                Drive up to the automated gate. Our optical license plate scanner auto-recognizes your vehicle for seamless access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits Showcase */}
      <section className="section-padding features-section">
        <div className="container">
          <div className="features-two-col">
            <div className="features-text-side">
              <span className="section-tag">WHY DRIVERS CHOOSE US</span>
              <h2 className="section-title">Engineered for Frictionless Urban Mobility</h2>
              <p className="features-main-para">
                SmartPark bridges the gap between drivers and modern parking infrastructure through live IoT occupancy telemetry, dynamic routing, and fast contactless payments.
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <CheckCircledIcon width={22} height={22} />
                  </div>
                  <div>
                    <h4 className="benefit-title">Guaranteed Space Reservations</h4>
                    <p className="benefit-desc">Never arrive to a 'Lot Full' sign again. Your spot stays locked for your arrival window.</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <LightningBoltIcon width={22} height={22} />
                  </div>
                  <div>
                    <h4 className="benefit-title">Dedicated EV Supercharging Stalls</h4>
                    <p className="benefit-desc">Level 2 and DC fast charging stalls reserved along with your parking booking.</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    <BarChartIcon width={22} height={22} />
                  </div>
                  <div>
                    <h4 className="benefit-title">Transparent Price Optimization</h4>
                    <p className="benefit-desc">Clear hourly and day passes with instant receipts and corporate expensing tools.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-visual-side">
              <div className="visual-card card">
                <img 
                  src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=900&q=80" 
                  alt="Smart Parking Facility" 
                  className="visual-img"
                />
                <div className="floating-metric-badge card">
                  <span className="f-title">Live Occupancy Sensor</span>
                  <div className="f-row">
                    <span className="badge badge-available">Online</span>
                    <strong className="f-val">42 Free Bays</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-counter-strip">
        <div className="container">
          <div className="stats-strip-grid">
            <div className="strip-item">
              <span className="strip-value">12,450+</span>
              <span className="strip-label">Total Parking Spaces</span>
            </div>
            <div className="strip-item">
              <span className="strip-value">98.8%</span>
              <span className="strip-label">Sensor Accuracy</span>
            </div>
            <div className="strip-item">
              <span className="strip-value">45,000+</span>
              <span className="strip-label">Happy Commuters</span>
            </div>
            <div className="strip-item">
              <span className="strip-value">15 mins</span>
              <span className="strip-label">Average Time Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">TESTIMONIALS</span>
            <h2 className="section-title">What Commuters Say</h2>
            <p className="section-subtitle">Thousands of daily commuters rely on SmartPark to reach meetings on time.</p>
          </div>

          <div className="grid-3">
            <div className="testi-card card">
              <div className="testi-stars">
                {[...Array(5)].map((_, i) => (
                  <StarFilledIcon key={i} className="star-icon" />
                ))}
              </div>
              <p className="testi-quote">
                "SmartPark transformed my morning commute to downtown SF. I reserve my spot from breakfast and roll straight into the Bayview garage with automated plate recognition."
              </p>
              <div className="testi-author">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Sarah J." className="testi-avatar" />
                <div>
                  <h4 className="author-name">Sarah Jenkins</h4>
                  <p className="author-role">Senior Product Manager</p>
                </div>
              </div>
            </div>

            <div className="testi-card card">
              <div className="testi-stars">
                {[...Array(5)].map((_, i) => (
                  <StarFilledIcon key={i} className="star-icon" />
                ))}
              </div>
              <p className="testi-quote">
                "The EV charging reservation is a lifesaver. Knowing that a Level 2 plug is actually held for my car makes downtown appointments stress-free."
              </p>
              <div className="testi-author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="David L." className="testi-avatar" />
                <div>
                  <h4 className="author-name">David Lin</h4>
                  <p className="author-role">Financial Analyst</p>
                </div>
              </div>
            </div>

            <div className="testi-card card">
              <div className="testi-stars">
                {[...Array(5)].map((_, i) => (
                  <StarFilledIcon key={i} className="star-icon" />
                ))}
              </div>
              <p className="testi-quote">
                "As an admin running 3 facilities, the SmartPark analytics portal gives us precise hourly turnover numbers that boosted our garage profitability by 28%."
              </p>
              <div className="testi-author">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Carlos M." className="testi-avatar" />
                <div>
                  <h4 className="author-name">Carlos Mendez</h4>
                  <p className="author-role">Facility Operations Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box card">
            <div className="cta-content">
              <h2 className="cta-heading">Ready for Hassle-Free Parking?</h2>
              <p className="cta-desc">Discover spots, book in seconds, and park with confidence anywhere in the city.</p>
            </div>
            <div className="cta-actions">
              <Link to="/find-parking" className="btn btn-primary btn-lg">
                Find Parking Now <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

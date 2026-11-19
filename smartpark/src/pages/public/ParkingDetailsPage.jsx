import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useParking } from '../../contexts/ParkingContext';
import { StatusBadge } from '../../components/common/CommonComponents';
import { ParkingMap } from '../../components/parking/ParkingMap';
import { 
  SewingPinIcon, 
  ClockIcon, 
  StarFilledIcon, 
  ShieldCheckIcon, 
  CheckCircledIcon,
  LightningBoltIcon,
  ArrowLeftIcon,
  LayersIcon,
  CalendarIcon
} from '@radix-ui/react-icons';
import './parkingDetails.css';

export const ParkingDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { facilities, spaces } = useParking();

  const facility = facilities.find(f => f.id === id) || facilities[0];
  const facilitySpaces = spaces.filter(s => s.facilityId === facility.id);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'spaces' | 'reviews' | 'security'

  const availableCount = facility.availableSpaces;
  const occupancyRate = Math.round(((facility.totalSpaces - facility.availableSpaces) / facility.totalSpaces) * 100);

  return (
    <div className="details-page-root">
      {/* Breadcrumb strip */}
      <div className="details-top-bar">
        <div className="container details-nav-row">
          <Link to="/find-parking" className="back-link">
            <ArrowLeftIcon /> Back to all parking
          </Link>
          <div className="top-actions">
            <StatusBadge status={facility.status} />
          </div>
        </div>
      </div>

      <div className="container details-content-body">
        {/* Main Header Card */}
        <div className="details-header-card card">
          <div className="details-img-gallery">
            <img src={facility.image} alt={facility.name} className="gallery-primary-img" />
          </div>

          <div className="details-header-text">
            <div className="header-meta-row">
              <span className="badge badge-info">{facility.type}</span>
              <div className="rating-pill">
                <StarFilledIcon className="star-icon" />
                <span>{facility.rating}</span>
                <span className="review-count">({facility.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="details-title">{facility.name}</h1>
            <p className="details-address">
              <SewingPinIcon /> {facility.address}
            </p>

            <div className="capacity-stat-box">
              <div className="cap-item">
                <span className="cap-label">Available Now</span>
                <strong className="cap-val text-success">{availableCount} Spots</strong>
              </div>
              <div className="cap-divider"></div>
              <div className="cap-item">
                <span className="cap-label">Total Capacity</span>
                <strong className="cap-val">{facility.totalSpaces} Spots</strong>
              </div>
              <div className="cap-divider"></div>
              <div className="cap-item">
                <span className="cap-label">Occupancy</span>
                <strong className="cap-val">{occupancyRate}%</strong>
              </div>
            </div>

            <div className="details-pricing-strip">
              <div className="price-block">
                <span className="rate-num">${facility.hourlyRate.toFixed(2)}</span>
                <span className="rate-unit">per hour</span>
              </div>
              <div className="price-block">
                <span className="rate-num">${facility.dailyRate.toFixed(2)}</span>
                <span className="rate-unit">per day (max)</span>
              </div>
              <Link 
                to={`/reserve?facilityId=${facility.id}`} 
                className="btn btn-primary btn-lg reserve-spot-btn"
              >
                <CalendarIcon /> Reserve Spot Now
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="details-tabs-bar">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Amenities
          </button>
          <button 
            className={`tab-btn ${activeTab === 'spaces' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('spaces')}
          >
            Real-Time Spaces Map ({facilitySpaces.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security & Access
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Customer Reviews ({facility.reviews?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-body-pane">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <div className="overview-left card">
                <h3 className="section-pane-title">About this Facility</h3>
                <p className="facility-long-desc">{facility.description}</p>

                <h4 className="sub-pane-title">Available Amenities</h4>
                <div className="amenities-grid">
                  {facility.features?.map((f, i) => (
                    <div key={i} className="amenity-item">
                      <CheckCircledIcon className="amenity-icon" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <h4 className="sub-pane-title">Hours of Operation</h4>
                <div className="hours-block">
                  <ClockIcon className="clock-icon" />
                  <span>{facility.openingHours}</span>
                </div>
              </div>

              <div className="overview-right card">
                <h3 className="section-pane-title">Location & Navigation</h3>
                <div className="details-map-container">
                  <ParkingMap facilities={[facility]} height="320px" />
                </div>
                <div className="map-meta-footer">
                  <span>{facility.distance} from your search center</span>
                  <a 
                    href={`https://maps.google.com/?q=${facility.coordinates.lat},${facility.coordinates.lng}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spaces' && (
            <div className="spaces-layout-card card">
              <div className="spaces-header">
                <div>
                  <h3 className="section-pane-title">Floor Space Sensor Telemetry</h3>
                  <p className="text-secondary">Green represents vacant bays ready for instant reservation.</p>
                </div>
                <div className="space-legend">
                  <span className="legend-item"><span className="legend-dot dot-avail"></span> Available</span>
                  <span className="legend-item"><span className="legend-dot dot-occ"></span> Occupied</span>
                  <span className="legend-item"><span className="legend-dot dot-res"></span> Reserved</span>
                  <span className="legend-item"><span className="legend-dot dot-maint"></span> Maintenance</span>
                </div>
              </div>

              {/* Graphical Parking Lot Floor Grid */}
              <div className="parking-lot-grid">
                {facilitySpaces.length > 0 ? (
                  facilitySpaces.map((sp) => (
                    <div 
                      key={sp.id} 
                      className={`bay-box bay-${sp.status.toLowerCase().replace(' ', '-')}`}
                    >
                      <div className="bay-number">{sp.spaceNumber}</div>
                      <div className="bay-type">{sp.type}</div>
                      <div className="bay-status-badge">{sp.status}</div>
                      {sp.vehiclePlate && (
                        <div className="bay-plate">{sp.vehiclePlate}</div>
                      )}
                      {sp.status === 'Available' && (
                        <Link 
                          to={`/reserve?facilityId=${facility.id}&spaceId=${sp.id}&spaceNumber=${sp.spaceNumber}&spaceType=${encodeURIComponent(sp.type)}`}
                          className="btn btn-primary btn-xs bay-reserve-btn"
                        >
                          Book Bay
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-spaces-notice">
                    <p>Sensor telemetry is currently synchronizing for this zone.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="security-card card">
              <div className="security-header">
                <ShieldCheckIcon width={32} height={32} className="text-primary" />
                <div>
                  <h3 className="section-pane-title">Access & Security Protocol</h3>
                  <p className="text-secondary">SmartPark verified security specifications for vehicle protection.</p>
                </div>
              </div>
              <p className="security-details-text">{facility.securityInfo}</p>
              <div className="security-features-row">
                <div className="sec-feature-box">
                  <strong>Automated ANPR</strong>
                  <p>Gate cameras scan your license plate for barrier lift.</p>
                </div>
                <div className="sec-feature-box">
                  <strong>24/7 Monitored CCTV</strong>
                  <p>High-definition sensors recording all vehicle ingress/egress.</p>
                </div>
                <div className="sec-feature-box">
                  <strong>Well-Lit & Patrolled</strong>
                  <p>Bright LED luminaires and on-duty security guard team.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-card card">
              <h3 className="section-pane-title">Verified Customer Experiences</h3>
              <div className="reviews-list">
                {facility.reviews?.map((rev) => (
                  <div key={rev.id} className="review-item">
                    <div className="rev-header">
                      <strong className="rev-author">{rev.user}</strong>
                      <span className="rev-date">{rev.date}</span>
                    </div>
                    <div className="rev-stars">
                      {[...Array(rev.rating)].map((_, i) => (
                        <StarFilledIcon key={i} className="star-icon" />
                      ))}
                    </div>
                    <p className="rev-comment">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

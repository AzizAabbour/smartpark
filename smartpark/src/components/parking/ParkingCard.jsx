import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/CommonComponents';
import { 
  SewingPinIcon, 
  ClockIcon, 
  StarFilledIcon, 
  LightningBoltIcon, 
  CheckCircledIcon 
} from '@radix-ui/react-icons';
import './parkingCard.css';

export const ParkingCard = ({ facility, onReserve }) => {
  const isAvailable = facility.availableSpaces > 0;
  const occupancyPercent = Math.round(((facility.totalSpaces - facility.availableSpaces) / facility.totalSpaces) * 100);

  return (
    <div className="parking-card card card-hover">
      <div className="card-image-box">
        <img src={facility.image} alt={facility.name} className="parking-image" />
        <div className="card-top-badges">
          <StatusBadge status={facility.status} />
          {facility.features?.includes('EV Charging') && (
            <span className="badge badge-ev">
              <LightningBoltIcon width={12} height={12} /> EV Ready
            </span>
          )}
        </div>
        <div className="card-rate-overlay">
          <span className="hourly-price">${facility.hourlyRate.toFixed(2)}</span>
          <span className="hourly-unit">/ hour</span>
        </div>
      </div>

      <div className="card-body-content">
        <div className="card-header-row">
          <h3 className="facility-title">
            <Link to={`/parking/${facility.id}`}>{facility.name}</Link>
          </h3>
          <div className="rating-pill">
            <StarFilledIcon className="star-icon" />
            <span>{facility.rating}</span>
            <span className="review-count">({facility.reviewCount})</span>
          </div>
        </div>

        <p className="facility-address">
          <SewingPinIcon className="loc-icon" />
          <span>{facility.address}</span>
        </p>

        <div className="spaces-progress-container">
          <div className="progress-info-row">
            <span className="capacity-label">Live Availability</span>
            <span className="capacity-numbers">
              <strong className={isAvailable ? 'text-success' : 'text-danger'}>
                {facility.availableSpaces}
              </strong> / {facility.totalSpaces} spots free
            </span>
          </div>
          <div className="progress-bar-track">
            <div 
              className={`progress-bar-fill ${occupancyPercent > 85 ? 'fill-high' : occupancyPercent > 60 ? 'fill-medium' : 'fill-low'}`}
              style={{ width: `${occupancyPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="features-tags-list">
          {facility.features?.slice(0, 3).map((feat, idx) => (
            <span key={idx} className="feat-chip">
              <CheckCircledIcon width={12} height={12} /> {feat}
            </span>
          ))}
          {facility.features?.length > 3 && (
            <span className="feat-chip-more">+{facility.features.length - 3}</span>
          )}
        </div>

        <div className="card-footer-actions">
          <div className="footer-distance">
            <ClockIcon width={13} height={13} />
            <span>{facility.distance || '0.5 km'} away</span>
          </div>
          <div className="action-buttons-group">
            <Link to={`/parking/${facility.id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
            <Link 
              to={`/reserve?facilityId=${facility.id}`} 
              className={`btn btn-primary btn-sm ${!isAvailable ? 'disabled' : ''}`}
            >
              Reserve
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

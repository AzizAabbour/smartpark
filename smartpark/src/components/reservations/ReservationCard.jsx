import React, { useState } from 'react';
import { StatusBadge } from '../common/CommonComponents';
import { 
  CalendarIcon, 
  ClockIcon, 
  SewingPinIcon, 
  IdCardIcon, 
  CrossCircledIcon,
  CheckCircledIcon,
  FileTextIcon
} from '@radix-ui/react-icons';
import { format } from 'date-fns';
import './reservationCard.css';

export const ReservationCard = ({ reservation, onCancel, onViewTicket }) => {
  const isCancellable = ['Upcoming', 'Active'].includes(reservation.status);

  return (
    <div className="reservation-card card">
      <div className="res-card-top">
        <div className="res-reference-group">
          <span className="res-label">Booking Reference</span>
          <span className="res-reference-code">{reservation.reference}</span>
        </div>
        <div className="res-status-badges">
          <StatusBadge status={reservation.status} />
          <span className="badge badge-info">{reservation.paymentStatus}</span>
        </div>
      </div>

      <div className="res-card-middle">
        <div className="res-facility-info">
          <h4 className="res-facility-name">{reservation.facilityName}</h4>
          <div className="res-details-grid">
            <div className="res-detail-item">
              <span className="item-label">Assigned Space</span>
              <strong className="item-val space-val">{reservation.spaceNumber} ({reservation.spaceType})</strong>
            </div>

            <div className="res-detail-item">
              <span className="item-label">Vehicle Plate</span>
              <strong className="item-val">{reservation.vehiclePlate || 'Not specified'}</strong>
            </div>

            <div className="res-detail-item">
              <span className="item-label">Check-in</span>
              <span className="item-val">
                {reservation.startTime ? format(new Date(reservation.startTime), 'MMM dd, yyyy • hh:mm a') : 'Flexible'}
              </span>
            </div>

            <div className="res-detail-item">
              <span className="item-label">Check-out</span>
              <span className="item-val">
                {reservation.endTime ? format(new Date(reservation.endTime), 'MMM dd, yyyy • hh:mm a') : 'Flexible'}
              </span>
            </div>
          </div>
        </div>

        <div className="res-amount-box">
          <span className="res-amount-label">Total Paid</span>
          <span className="res-amount-val">${reservation.totalPrice?.toFixed(2)}</span>
          <span className="res-duration">{reservation.durationHours} hrs booked</span>
        </div>
      </div>

      <div className="res-card-bottom">
        <div className="res-created-date">
          Booked on {reservation.bookedAt ? format(new Date(reservation.bookedAt), 'MMM dd, yyyy') : 'Recently'}
        </div>

        <div className="res-actions">
          {onViewTicket && (
            <button className="btn btn-outline btn-sm" onClick={() => onViewTicket(reservation)}>
              <FileTextIcon /> View Ticket / QR
            </button>
          )}

          {isCancellable && onCancel && (
            <button 
              className="btn btn-danger-outline btn-sm" 
              onClick={() => onCancel(reservation.id)}
            >
              <CrossCircledIcon /> Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

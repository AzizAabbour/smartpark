import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useParking } from '../../contexts/ParkingContext';
import { 
  CheckCircledIcon, 
  CalendarIcon, 
  ClockIcon, 
  SewingPinIcon, 
  IdCardIcon, 
  LightningBoltIcon,
  ShieldCheckIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import './reservationPage.css';

// Zod Validation Schema
const reservationSchema = z.object({
  facilityId: z.string().min(1, 'Please select a parking facility'),
  arrivalDate: z.string().min(1, 'Arrival date is required'),
  arrivalTime: z.string().min(1, 'Arrival time is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  departureTime: z.string().min(1, 'Departure time is required'),
  spaceType: z.string().default('Standard'),
  vehiclePlate: z.string().min(3, 'Vehicle license plate must be at least 3 characters'),
  vehicleModel: z.string().optional(),
  paymentMethod: z.string().default('Credit Card')
});

export const ReservationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { facilities, spaces, createReservation } = useParking();

  const preselectedFacilityId = searchParams.get('facilityId') || (facilities[0]?.id ?? '');
  const preselectedSpaceId = searchParams.get('spaceId') || '';
  const preselectedSpaceNumber = searchParams.get('spaceNumber') || '';
  const preselectedSpaceType = searchParams.get('spaceType') || 'Standard';

  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Form Setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      facilityId: preselectedFacilityId,
      arrivalDate: '2026-11-20',
      arrivalTime: '09:00',
      departureDate: '2026-11-20',
      departureTime: '18:00',
      spaceType: preselectedSpaceType,
      vehiclePlate: currentUser?.vehiclePlate || '7XYZ912',
      vehicleModel: currentUser?.vehicleModel || 'Tesla Model 3',
      paymentMethod: 'Credit Card'
    }
  });

  const watchFacilityId = watch('facilityId');
  const watchArrivalDate = watch('arrivalDate');
  const watchArrivalTime = watch('arrivalTime');
  const watchDepartureDate = watch('departureDate');
  const watchDepartureTime = watch('departureTime');
  const watchSpaceType = watch('spaceType');

  // Selected Facility
  const currentFacility = facilities.find(f => f.id === watchFacilityId) || facilities[0];

  // Calculate Duration & Pricing Automatically
  const calculatePricing = () => {
    try {
      const start = new Date(`${watchArrivalDate}T${watchArrivalTime}`);
      const end = new Date(`${watchDepartureDate}T${watchDepartureTime}`);
      
      let diffMs = end - start;
      if (isNaN(diffMs) || diffMs <= 0) {
        return { hours: 1, baseTotal: currentFacility?.hourlyRate || 3.5, multiplier: 1.0, total: currentFacility?.hourlyRate || 3.5 };
      }

      const diffHours = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));
      
      let multiplier = 1.0;
      if (watchSpaceType === 'EV Charging') multiplier = 1.25;
      if (watchSpaceType === 'VIP') multiplier = 1.5;

      const hourlyRate = currentFacility ? currentFacility.hourlyRate : 3.50;
      const calculatedTotal = (diffHours * hourlyRate * multiplier);

      return {
        hours: diffHours,
        baseRate: hourlyRate,
        multiplier,
        total: Math.round(calculatedTotal * 100) / 100
      };
    } catch (e) {
      return { hours: 1, total: 3.5 };
    }
  };

  const pricing = calculatePricing();

  const onSubmit = (data) => {
    if (!isAuthenticated) {
      toast.error('Please log in or register to complete your reservation.');
      navigate('/login?redirect=/reserve');
      return;
    }

    const startISO = `${data.arrivalDate}T${data.arrivalTime}:00Z`;
    const endISO = `${data.departureDate}T${data.departureTime}:00Z`;

    const reservationPayload = {
      facilityId: currentFacility.id,
      facilityName: currentFacility.name,
      spaceId: preselectedSpaceId || null,
      spaceNumber: preselectedSpaceNumber || (preselectedSpaceId ? 'Dedicated Stall' : 'Auto-assigned Entry Bay'),
      spaceType: data.spaceType,
      vehiclePlate: data.vehiclePlate.toUpperCase(),
      startTime: startISO,
      endTime: endISO,
      durationHours: pricing.hours,
      totalPrice: pricing.total,
      paymentMethod: data.paymentMethod
    };

    const created = createReservation(reservationPayload, currentUser);
    setBookingSuccessData(created);
    toast.success('Reservation successfully confirmed!');
  };

  if (bookingSuccessData) {
    return (
      <div className="reservation-success-container container">
        <div className="success-receipt-card card">
          <div className="success-icon-banner">
            <CheckCircledIcon width={52} height={52} />
          </div>
          <h2 className="success-headline">Reservation Confirmed!</h2>
          <p className="success-sub">A receipt and parking pass have been issued.</p>

          <div className="receipt-box">
            <div className="receipt-ref-row">
              <span>Booking Reference</span>
              <strong>{bookingSuccessData.reference}</strong>
            </div>
            <div className="receipt-divider"></div>
            <div className="receipt-info-grid">
              <div>
                <span className="r-label">Facility</span>
                <span className="r-val">{bookingSuccessData.facilityName}</span>
              </div>
              <div>
                <span className="r-label">Space Allocated</span>
                <span className="r-val text-primary">{bookingSuccessData.spaceNumber} ({bookingSuccessData.spaceType})</span>
              </div>
              <div>
                <span className="r-label">Registered Vehicle</span>
                <span className="r-val">{bookingSuccessData.vehiclePlate}</span>
              </div>
              <div>
                <span className="r-label">Duration</span>
                <span className="r-val">{bookingSuccessData.durationHours} Hours</span>
              </div>
            </div>
            <div className="receipt-divider"></div>
            <div className="receipt-total-row">
              <span>Total Paid</span>
              <strong className="text-primary">${bookingSuccessData.totalPrice.toFixed(2)}</strong>
            </div>
          </div>

          <div className="success-action-buttons">
            <Link to="/dashboard" className="btn btn-primary">
              Go to My Reservations
            </Link>
            <button onClick={() => window.print()} className="btn btn-outline">
              Print / Save Pass
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page-root">
      <div className="container">
        <div className="reservation-header">
          <h1 className="res-title">Book Parking Spot</h1>
          <p className="res-subtitle">Guaranteed stall reservation with automated ANPR gate opening.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="reservation-layout">
          {/* Form Left Side */}
          <div className="reservation-form-side card">
            <h3 className="form-card-title">Reservation Details</h3>

            {/* Facility Selector */}
            <div className="form-group">
              <label className="form-label">Parking Location</label>
              <select {...register('facilityId')} className="form-select">
                {facilities.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} — ${f.hourlyRate.toFixed(2)}/hr ({f.availableSpaces} spots left)
                  </option>
                ))}
              </select>
              {errors.facilityId && <span className="form-error">{errors.facilityId.message}</span>}
            </div>

            {/* Dates & Times */}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Arrival Date</label>
                <input type="date" {...register('arrivalDate')} className="form-input" />
                {errors.arrivalDate && <span className="form-error">{errors.arrivalDate.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Arrival Time</label>
                <input type="time" {...register('arrivalTime')} className="form-input" />
                {errors.arrivalTime && <span className="form-error">{errors.arrivalTime.message}</span>}
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Departure Date</label>
                <input type="date" {...register('departureDate')} className="form-input" />
                {errors.departureDate && <span className="form-error">{errors.departureDate.message}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Departure Time</label>
                <input type="time" {...register('departureTime')} className="form-input" />
                {errors.departureTime && <span className="form-error">{errors.departureTime.message}</span>}
              </div>
            </div>

            {/* Space Type */}
            <div className="form-group">
              <label className="form-label">Parking Space Type</label>
              <select {...register('spaceType')} className="form-select">
                <option value="Standard">Standard Stall (Regular Sedan / SUV)</option>
                <option value="EV Charging">EV Charging Dedicated Bay (+25%)</option>
                <option value="Accessible">Accessible / ADA Priority Bay</option>
                <option value="VIP">VIP Covered Extra-Wide Space (+50%)</option>
              </select>
            </div>

            <h3 className="form-card-title mt-4">Vehicle Identification</h3>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">License Plate Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. 7XYZ912" 
                  {...register('vehiclePlate')} 
                  className="form-input text-uppercase" 
                />
                {errors.vehiclePlate && <span className="form-error">{errors.vehiclePlate.message}</span>}
                <span className="helper-text">Used for automatic barrier camera recognition</span>
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Make & Model (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Tesla Model 3" 
                  {...register('vehicleModel')} 
                  className="form-input" 
                />
              </div>
            </div>

            <h3 className="form-card-title mt-4">Payment Method (Simulation)</h3>
            <div className="payment-options-grid">
              <label className="payment-card-option">
                <input type="radio" value="Credit Card" {...register('paymentMethod')} defaultChecked />
                <span>Credit / Debit Card (Instant)</span>
              </label>
              <label className="payment-card-option">
                <input type="radio" value="Apple Pay" {...register('paymentMethod')} />
                <span>Apple Pay / Google Wallet</span>
              </label>
            </div>
          </div>

          {/* Booking Summary Right Side */}
          <div className="reservation-summary-side">
            <div className="summary-card card">
              <h3 className="summary-title">Booking Summary</h3>

              {currentFacility && (
                <div className="summary-facility-box">
                  <img src={currentFacility.image} alt={currentFacility.name} className="summary-fac-thumb" />
                  <div>
                    <h4 className="fac-name">{currentFacility.name}</h4>
                    <p className="fac-addr">{currentFacility.address}</p>
                  </div>
                </div>
              )}

              <div className="summary-rows-list">
                <div className="sum-row">
                  <span>Duration</span>
                  <strong>{pricing.hours} hours</strong>
                </div>
                <div className="sum-row">
                  <span>Hourly Rate</span>
                  <span>${currentFacility?.hourlyRate?.toFixed(2)} / hr</span>
                </div>
                {pricing.multiplier > 1.0 && (
                  <div className="sum-row">
                    <span>Space Type Multiplier</span>
                    <span>+{Math.round((pricing.multiplier - 1) * 100)}%</span>
                  </div>
                )}
                <div className="sum-row">
                  <span>Service Fee</span>
                  <span className="text-success">Free ($0.00)</span>
                </div>
              </div>

              <div className="summary-total-strip">
                <span className="total-label">Estimated Total</span>
                <span className="total-figure">${pricing.total.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="btn btn-primary btn-lg w-100 mt-4"
              >
                {isSubmitting ? 'Processing...' : 'Confirm & Reserve Spot'}
              </button>

              <div className="trust-footer">
                <ShieldCheckIcon width={16} height={16} />
                <span>Free cancellation up to 2 hours prior to arrival</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

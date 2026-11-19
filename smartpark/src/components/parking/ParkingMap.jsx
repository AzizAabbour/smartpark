import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/CommonComponents';
import 'leaflet/dist/leaflet.css';
import './parkingMap.css';

// Fix standard marker icons in leaflet with Vite
const createCustomMarker = (spacesCount, isAvailable) => {
  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: `
      <div class="map-pin ${isAvailable ? 'pin-available' : 'pin-occupied'}">
        <span class="pin-number">${spacesCount}</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

export const ParkingMap = ({ facilities = [], selectedId, onSelectFacility, height = '500px' }) => {
  // Default center: San Francisco downtown
  const defaultCenter = [37.7875, -122.4085];

  return (
    <div className="parking-map-wrapper card" style={{ height }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {facilities.map((fac) => {
          const isAvail = fac.availableSpaces > 0;
          const isSelected = selectedId === fac.id;
          return (
            <Marker
              key={fac.id}
              position={[fac.coordinates.lat, fac.coordinates.lng]}
              icon={createCustomMarker(fac.availableSpaces, isAvail)}
              eventHandlers={{
                click: () => onSelectFacility && onSelectFacility(fac)
              }}
            >
              <Popup className="smartpark-custom-popup">
                <div className="map-popup-card">
                  <div className="popup-header">
                    <h4 className="popup-title">{fac.name}</h4>
                    <StatusBadge status={fac.status} />
                  </div>
                  <p className="popup-address">{fac.address}</p>
                  
                  <div className="popup-stats-row">
                    <div className="popup-stat">
                      <span className="stat-label">Available</span>
                      <strong className="stat-num text-success">{fac.availableSpaces}</strong>
                      <span className="stat-total">/ {fac.totalSpaces} spots</span>
                    </div>
                    <div className="popup-stat">
                      <span className="stat-label">Rate</span>
                      <strong className="stat-num">${fac.hourlyRate.toFixed(2)}/hr</strong>
                      <span className="stat-total">${fac.dailyRate}/day</span>
                    </div>
                  </div>

                  <div className="popup-actions">
                    <Link to={`/parking/${fac.id}`} className="btn btn-secondary btn-sm w-100">
                      View Details
                    </Link>
                    <Link to={`/reserve?facilityId=${fac.id}`} className="btn btn-primary btn-sm w-100">
                      Reserve Spot
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

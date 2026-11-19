import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParking } from '../../contexts/ParkingContext';
import { ParkingCard } from '../../components/parking/ParkingCard';
import { ParkingMap } from '../../components/parking/ParkingMap';
import { 
  MagnifyingGlassIcon, 
  MixerHorizontalIcon, 
  ResetIcon, 
  LayersIcon, 
  LightningBoltIcon,
  ViewHorizontalIcon,
  CheckIcon
} from '@radix-ui/react-icons';
import './findParking.css';

export const FindParkingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { facilities } = useParking();

  const queryLoc = searchParams.get('location') || '';
  const queryType = searchParams.get('type') || 'all';

  const [searchTerm, setSearchTerm] = useState(queryLoc);
  const [selectedType, setSelectedType] = useState(queryType);
  const [maxPrice, setMaxPrice] = useState(6.00);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyEV, setOnlyEV] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'list' | 'map'

  // Filter and sort facilities
  const filteredFacilities = useMemo(() => {
    return facilities.filter((fac) => {
      // Search text (name, address, city)
      const matchesSearch = searchTerm.trim() === '' || 
        fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fac.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fac.city.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = selectedType === 'all' || fac.type.toLowerCase().includes(selectedType.toLowerCase());

      // Price filter
      const matchesPrice = fac.hourlyRate <= maxPrice;

      // Availability filter
      const matchesAvail = !onlyAvailable || fac.availableSpaces > 0;

      // EV filter
      const matchesEV = !onlyEV || fac.features?.includes('EV Charging');

      return matchesSearch && matchesType && matchesPrice && matchesAvail && matchesEV;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'availability') return b.availableSpaces - a.availableSpaces;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default recommended
    });
  }, [facilities, searchTerm, selectedType, maxPrice, onlyAvailable, onlyEV, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setMaxPrice(6.00);
    setOnlyAvailable(false);
    setOnlyEV(false);
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div className="find-parking-page">
      <div className="find-parking-top-banner">
        <div className="container">
          <h1 className="page-main-title">Find Parking Spaces</h1>
          <p className="page-desc">
            Explore {facilities.length} smart facilities across the metro area with real-time slot telemetry.
          </p>

          {/* Search bar & Quick controls */}
          <div className="find-search-bar card">
            <div className="search-input-group">
              <MagnifyingGlassIcon width={18} height={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by neighborhood, street, or garage name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="find-text-input"
              />
            </div>

            <div className="quick-filter-dropdowns">
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Structure Types</option>
                <option value="Covered">Covered Structure</option>
                <option value="Underground">Underground Garage</option>
                <option value="Open Surface">Open Surface Lot</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="availability">Most Available Slots</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container find-parking-body">
        {/* Filter Controls Strip */}
        <div className="filter-chips-strip">
          <div className="active-filter-toggles">
            <button
              className={`filter-chip ${onlyAvailable ? 'chip-active' : ''}`}
              onClick={() => setOnlyAvailable(!onlyAvailable)}
            >
              <CheckIcon /> Only Available Slots
            </button>

            <button
              className={`filter-chip ${onlyEV ? 'chip-active' : ''}`}
              onClick={() => setOnlyEV(!onlyEV)}
            >
              <LightningBoltIcon /> Has EV Fast Charging
            </button>

            <div className="price-slider-inline">
              <span className="price-label">Max Rate: <strong>${maxPrice.toFixed(2)}/hr</strong></span>
              <input
                type="range"
                min="1.50"
                max="6.00"
                step="0.25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="price-range-slider"
              />
            </div>
          </div>

          <div className="filter-strip-right">
            <button className="reset-btn" onClick={handleResetFilters}>
              <ResetIcon /> Reset Filters
            </button>
            <span className="results-count-text">
              Showing <strong>{filteredFacilities.length}</strong> {filteredFacilities.length === 1 ? 'location' : 'locations'}
            </span>
          </div>
        </div>

        {/* Split View: List on Left, Map on Right */}
        <div className="find-parking-layout">
          {/* Facilities List Column */}
          <div className="facilities-column">
            {filteredFacilities.length === 0 ? (
              <div className="empty-results-box card">
                <LayersIcon width={40} height={40} className="empty-icon" />
                <h3>No parking spots match your filters</h3>
                <p>Try widening your search radius or resetting applied filters.</p>
                <button className="btn btn-primary btn-sm" onClick={handleResetFilters}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="facilities-grid">
                {filteredFacilities.map((fac) => (
                  <div 
                    key={fac.id}
                    onMouseEnter={() => setSelectedFacilityId(fac.id)}
                    className={selectedFacilityId === fac.id ? 'highlighted-card-wrapper' : ''}
                  >
                    <ParkingCard facility={fac} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Map Column */}
          <div className="map-column">
            <div className="sticky-map-wrapper">
              <ParkingMap
                facilities={filteredFacilities}
                selectedId={selectedFacilityId}
                onSelectFacility={(fac) => setSelectedFacilityId(fac.id)}
                height="650px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import './common.css';

export const StatusBadge = ({ status, text }) => {
  const normalized = (status || 'unknown').toLowerCase();
  let badgeClass = 'badge-maintenance';

  if (['available', 'active', 'confirmed', 'paid'].includes(normalized)) {
    badgeClass = 'badge-available';
  } else if (['occupied', 'cancelled', 'inactive', 'failed'].includes(normalized)) {
    badgeClass = 'badge-occupied';
  } else if (['reserved', 'upcoming', 'pending', 'almost full'].includes(normalized)) {
    badgeClass = 'badge-reserved';
  } else if (['info', 'standard', 'ev charging'].includes(normalized)) {
    badgeClass = 'badge-info';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span className="badge-dot"></span>
      {text || status}
    </span>
  );
};

export const StatCard = ({ title, value, change, icon: Icon, subtext, trend = 'up' }) => {
  return (
    <div className="stat-card card">
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        {Icon && (
          <div className="stat-icon-wrapper">
            <Icon width={20} height={20} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      {(change !== undefined || subtext) && (
        <div className="stat-footer">
          {change !== undefined && (
            <span className={`stat-change ${trend === 'up' ? 'stat-change-up' : trend === 'down' ? 'stat-change-down' : 'stat-change-neutral'}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
            </span>
          )}
          {subtext && <span className="stat-subtext">{subtext}</span>}
        </div>
      )}
    </div>
  );
};

export const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">{text}</p>
    </div>
  );
};

export const EmptyState = ({ title, message, actionText, onAction, icon: Icon }) => {
  return (
    <div className="empty-state card">
      {Icon && (
        <div className="empty-icon-box">
          <Icon width={36} height={36} />
        </div>
      )}
      <h3 className="empty-title">{title}</h3>
      <p className="empty-message">{message}</p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm mt-3">
          {actionText}
        </button>
      )}
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 550 }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content card" 
        style={{ maxWidth: `${maxWidth}px` }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', confirmVariant = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth={440}>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions">
        <button type="button" className="btn btn-outline" onClick={onClose}>
          Cancel
        </button>
        <button 
          type="button" 
          className={`btn ${confirmVariant === 'danger' ? 'btn-danger' : 'btn-primary'}`} 
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

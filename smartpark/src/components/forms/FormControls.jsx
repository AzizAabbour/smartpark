import React from 'react';
import './forms.css';

export const FormInput = React.forwardRef(({
  label,
  error,
  type = 'text',
  icon: Icon,
  helperText,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="input-with-icon-wrapper">
        {Icon && <span className="input-icon-left"><Icon width={16} height={16} /></span>}
        <input
          ref={ref}
          type={type}
          className={`form-input ${Icon ? 'has-left-icon' : ''} ${error ? 'input-has-error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="form-error">{error.message || error}</span>}
      {!error && helperText && <span className="form-helper">{helperText}</span>}
    </div>
  );
});

export const FormSelect = React.forwardRef(({
  label,
  error,
  options = [],
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <select
        ref={ref}
        className={`form-select ${error ? 'input-has-error' : ''}`}
        {...props}
      >
        {children ? children : options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error.message || error}</span>}
    </div>
  );
});

export const FormTextarea = React.forwardRef(({
  label,
  error,
  rows = 3,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={`form-textarea ${error ? 'input-has-error' : ''}`}
        {...props}
      />
      {error && <span className="form-error">{error.message || error}</span>}
    </div>
  );
});

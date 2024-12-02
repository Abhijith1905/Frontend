import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
};

export default Button;
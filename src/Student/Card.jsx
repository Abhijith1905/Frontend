import React from 'react';
import PropTypes from 'prop-types';

function Card({ children, className = '', ...props }) {
  return (
    <div>
    <div style={{paddingTop:"100px"}} className={`card ${className}`} {...props}>
      {children}
    </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
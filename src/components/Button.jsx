import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ size, label, onClick, type, leadingIcon, trailingIcon}) => {
    
    return (
        <button className={`${size} ${type}`} onClick={onClick}>
            {leadingIcon}{label}{trailingIcon}
        </button>
    );
};

Button.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['primary', 'secondary', 'dashed', 'icon']),
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    leadingIcon: PropTypes.element,
    trailingIcon: PropTypes.element,
};

export default Button;
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ size, label, onClick, type, leadingIcon, trailingIcon}) => {
    
    return (
        <button className={`${size} ${type}`} onClick={onClick}>
            {leadingIcon}{label}{trailingIcon}
        </button>
    );
};

Button.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['primary', 'secondary', 'dashed']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    leadingIcon: PropTypes.element,
    trailingIcon: PropTypes.element,
};

export default Button;
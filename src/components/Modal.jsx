import React from 'react';
import ContentArea from './ContentArea';

const Modal = ({isOpen, onClose}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overaly">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    
    );
};

export default Modal;
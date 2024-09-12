import React from 'react';
import './Alert.css';
import Button from '../Button/Button';

const Alert = ({ onUndo }) => {

    function handleUndo() {
        onUndo();
    }

    return (
        <div className='alert'>
            <h2>You completed all your tasks! Consider the day done!</h2>
            <Button size='medium' type='primary' label='Reset' onClick={handleUndo}></Button>
        </div>
    );
};

export default Alert;
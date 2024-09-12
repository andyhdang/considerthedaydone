import React, { useState } from 'react';
import Button from '../Button/Button';
import './TaskForm.css';

const TaskForm = ({ onAdd, onClose, onSave, header, title, details, save, add }) => {
    const [formData, setFormData] = useState({
        title: title || '',
        details: details || ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => {
            return { ...prevData, [name]: value };
        });
    }

    function handleAdd(event) {
        event.preventDefault();
        onAdd(formData);
        setFormData({
            title: '',
            details: ''
        });
    }

    function handleSave(event) {
        event.preventDefault();
        onSave(formData);
        setFormData({
            title: '',
            details: ''
        });
    }

    function handleCancel(event) {
        event.preventDefault();
        onClose();
    }

    return (
        <div>
            <form>
                <h2>{header}</h2>
                <input
                    name="title"
                    type="text"
                    placeholder="What do you need to get done today?"
                    onChange={handleChange}
                    value={formData.title}
                />
                <textarea
                    name="details"
                    placeholder="Add any details here"
                    rows={2}
                    onChange={handleChange}
                    value={formData.details}
                ></textarea>
                <div className="button-group">
                    <Button
                        onClick={handleCancel}
                        size="medium"
                        label="Cancel"
                        type="secondary"
                    ></Button>
                    {save ? <Button onClick={handleSave} size="medium" label="Save" type="primary"></Button> : null}
                    {add ? <Button onClick={handleAdd} size="medium" label="Add" type="primary"></Button> : null}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;

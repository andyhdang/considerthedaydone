import React, { useState } from 'react';
import Button from '../Button';
import './TaskForm.css';

const AddTaskForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        details: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => {
            return { ...prevData, [name]: value };
        });
    }

    function handleAdd(event) {
        event.preventDefault();
        props.onAdd(formData);
        setFormData({
            title: '',
            details: ''
        });
    }

    function handleClose(event) {
        event.preventDefault();
        props.onClose();
    }

    return (
        <div>
            <form>
                <h2>Add a new task</h2>
                <input
                    name="title"
                    type="text"
                    placeholder= "What do you need to get done today?"
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
                        onClick={handleClose}
                        size="medium"
                        label="Cancel"
                        type="secondary"
                    ></Button>
                    <Button onClick={handleAdd} size="medium" label="Add"></Button>
                </div>

            </form>
        </div>
    );
};

export default AddTaskForm;

import React, { useState } from 'react';
import Button from './Button';
import CloseIcon from '@mui/icons-material/Close';

const ContentArea = (props) => {
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
        })
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
                    placeholder="What do you need to get done today?"
                    onChange={handleChange}
                    value={formData.title}
                />
                <textarea
                    name="details"
                    placeholder="add any details here"
                    rows={3}
                    onChange={handleChange}
                    value={formData.details}
                ></textarea>
                <Button onClick={handleAdd} size='medium' label='Add'></Button>
                <Button onClick={handleClose} size='medium' label='Cancel' type='secondary' leadingIcon={<CloseIcon/>}></Button>
            </form>
        </div>
    );
};

export default ContentArea;
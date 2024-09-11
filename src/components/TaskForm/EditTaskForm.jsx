import React, {useState} from 'react';
import Button from '../Button';

const EditTaskForm = ({editTodo, task}) => {
const [value, setValue] = useState(task.task);

const handleChange = (e) => {
    setValue(e.target.value);
}
const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(task.id, value);
}
const handleClose = (e) => {
    e.preventDefault();
    editTodo(task.id, task.task);
}


    return (
        <div>
            <h2>Edit task</h2>
            <input
                name="title"
                type="text"
                placeholder="What do you need to get done today?"
                onChange={handleChange}
                value={task.title}
            />
            <textarea
                name="details"
                placeholder="Add any details here"
                rows={2}
                onChange={handleChange}
                value={task.details}
            ></textarea>
            <div className="button-group">
                <Button
                    onClick={handleClose}
                    size="medium"
                    label="Cancel"
                    type="secondary"
                ></Button>
                <Button onClick={handleSubmit} size="medium" label="Submit"></Button>
            </div>
        </div>
    );
};

export default EditTaskForm;
import React, {useState} from 'react';
import Button from '../Button/Button';
import DoneIcon from '@mui/icons-material/Done';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './Note.css';

const Note = (props) => {
    const [isDone, setIsDone] = useState(false);

    function handleDone() {
        props.onDone(props.id); //used to change isComplete state
        setIsDone(!isDone); //used to add line-through style
    }

    function handleEdit() {
        console.log('Edit clicked');
        props.onEdit(props.id);
    }

    return (
        <div className="note">
            <div style={{textDecoration: isDone? 'line-through' : null, textDecorationThickness: isDone? '5px' : null}}className="text-content">
                <h1>{props.title}</h1>
                <p>{props.details}</p>
            </div>
            <div className='bottom-right'>
                <div className="button-group">
                    <Button type='icon' leadingIcon={<EditOutlinedIcon/>} size='small' onClick={handleEdit}></Button>
                    <Button type='icon' leadingIcon={<DoneIcon/>} size='small' onClick={handleDone}></Button>
                 </div>
            
            </div>
            
        </div>
    );
};

export default Note;

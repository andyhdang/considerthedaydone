import React, {useState} from 'react';
import Button from './Button';
import DoneIcon from '@mui/icons-material/Done';

const Note = (props) => {
    const [isDone, setIsDone] = useState(false);

    function handleClick() {
        props.onDone(props.id);
        setIsDone(!isDone); //used to change color of note
    }

    return (
        <div className="note">
            <div style={{textDecoration: isDone? 'line-through' : null}}className="text-content">
                <h1>{props.title}</h1>
                <p>{props.details}</p>
            </div>
            <div className='bottom-right'>
            <Button type="icon" leadingIcon={<DoneIcon/>} size='small' onClick={handleClick}></Button>
            </div>
            
        </div>
    );
};

export default Note;

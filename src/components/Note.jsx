import React, {useState} from 'react';
import Button from './Button';
import DoneIcon from '@mui/icons-material/Done';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Note = (props) => {
    const [isDone, setIsDone] = useState(false);

    function handleDone() {
        props.onDone(props.id);
        setIsDone(!isDone); //used to change color of note
    }

    function handleEdit() {
        console.log('Edit clicked');
        props.onEdit(props.id);
    }

    return (
        <div className="note">
            <div style={{textDecoration: isDone? 'line-through' : null}}className="text-content">
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

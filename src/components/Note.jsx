import React, {useState} from 'react';

const Note = (props) => {
    const [isDone, setIsDone] = useState(false);

    function handleClick() {
        props.onDone(props.id);
        setIsDone(!isDone); //used to change color of note
    }

    return (
        <div style={{ border: isDone? '3px solid lightgreen' : '3px solid white' }} className="note">
            <div style={{color: isDone? 'white' : 'black'}}className="text-content">
                <h1>{props.title}</h1>
                <p>{props.details}</p>
            </div>
            <button className="secondary" onClick={handleClick}>Done</button>
        </div>
    );
};

export default Note;

import { useState, useEffect } from 'react';
import './App.css';

//External Library
import confetti from 'canvas-confetti';

//Icons
import AddIcon from '@mui/icons-material/Add';

//Components
import Header from './components/Header';
import Button from './components/Button';
import InputModal from './components/InputModal/InputModal';
import Note from './components/Note';


function App() {
  const [notes, setNotes] = useState([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isAllComplete, setIsAllComplete] = useState(false);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    setIsInputOpen(false);
  }
  
  function handleDone(id) {
    setNotes(prevNotes => {
      return prevNotes.map((note, index) => {
        if (index === id) {
          return {
            ...note,
            isComplete: !note.isComplete
          };
        }
        return note;
      });
    });
  }

  function handleEdit(id) {
    const note = notes[id];
    console.log('Editing note:', note);
    setIsInputOpen(true);
    
    
  }

  function handleUndo() {
    window.location.reload();
  }

  useEffect(() => {
    const allComplete = notes.every(note => note.isComplete);
    if (allComplete && notes.length > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      // alert('Congratulations! You finished all your tasks. Consider the day DONE!');
      setIsAllComplete(true);
    }
  }, [notes]);

  function openInput() {
    setIsInputOpen(true);
  }

  function closeInput() {
    setIsInputOpen(false);
  }

  

  return (
    <>
      <Header />
      <div className="notes">
        {notes.map((note, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={note.title}
              details={note.details}
              onDone={handleDone}
              isComplete={note.isComplete || false}
              onEdit={handleEdit}
            />
          );
        })}
        <Button size='medium' type='dashed' label='Add new task' onClick={openInput} leadingIcon={<AddIcon/>}></Button>
      </div>
      {isInputOpen && <InputModal onAdd={addNote} onClose={closeInput} />}
      {isAllComplete && <Button size='medium' type='secondary' label='Undo' onClick={handleUndo}></Button>}
  
      
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';

//External Library
import confetti from 'canvas-confetti';

//Icons
import AddIcon from '@mui/icons-material/Add';

//Components
import Header from './components/Header';
import Button from './components/Button/Button';
import Note from './components/Note/Note';
import TaskForm from './components/TaskForm/TaskForm';


function App() {

  //list of notes
  const [notes, setNotes] = useState([]);

  //states for editing notes
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingNote, setEditingNote] = useState({ title: '', details: '' });

  //states for adding notes
  const [isAddFormOpen, setisAddFormOpen] = useState(false);

  //state for all tasks completed
  const [isAllComplete, setIsAllComplete] = useState(false);


  //function to add new note
  function handleAdd(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    setisAddFormOpen(false);
  }

  //function to mark note as done
  function handleDone(id) {
    setNotes(prevNotes => {
      return prevNotes.map((note, index) => {
        if (index === id) {
          return {
            ...note,
            isComplete: !note.isComplete //if all notes are complete then show confetti
          };
        }
        return note;
      });
    });
  }

  function handleEdit(id) {
    setIsTaskFormOpen(true);
    setEditingId(id);
    setEditingNote(notes[id]);
  }

  function handleSave(newNote) {
    setNotes(prevNotes => {
      return prevNotes.map((note, index) => {
        if (index === editingId) {
          return newNote;
        }
        return note;
      });
    });
    setEditingId(null);
  }

  function handleCancel() {
    setEditingId(null);
    setisAddFormOpen(false);
    setIsTaskFormOpen(false);
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
      alert('Congratulations! You finished all your tasks. Consider the day DONE!');
      setIsAllComplete(true);
    }
  }, [notes]);

  function openInput() {
    setisAddFormOpen(true);
  }

  function closeInput() {
    setisAddFormOpen(false);
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
              isComplete={note.isComplete || false}
              onDone={handleDone}
              onEdit={handleEdit}
            />
          );
        })}
        <Button size='medium' type='dashed' label='Add new task' onClick={openInput} leadingIcon={<AddIcon />}></Button>
      </div>
      {notes.map((note, index) => {
        if (index === editingId && note && isTaskFormOpen) {
          return (
            <TaskForm
              key={index}
              onSave={handleSave}
              onClose={handleCancel}
              onAdd={handleAdd}
              title={editingNote.title}
              details={editingNote.details}
              header='Edit task'
              save={true}
              add={false}
            />
          );
        }
        return null;
      })}


      {isAddFormOpen &&
        <TaskForm
          onClose={handleCancel}
          onAdd={handleAdd}
          header='Add task'
          save={false}
          add={true}
        />}
      {isAllComplete && <Button size='medium' type='secondary' label='Undo' onClick={handleUndo}></Button>}

    </>
  );
}

export default App;

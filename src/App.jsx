import { useState, useEffect } from 'react';
import './App.css';

//External Library
import confetti from 'canvas-confetti';

//Icons
import AddIcon from '@mui/icons-material/Add';

//Components
import Header from './components/Header';
import Button from './components/Button';
import AddTaskForm from './components/TaskForm/AddTaskForm';
// import EditTaskForm from './components/TaskForm/EditTaskForm';
import Note from './components/Note';
// import Add from '@mui/icons-material/Add';
import TaskForm from './components/TaskForm/TaskForm';


function App() {

  //list of notes
  const [notes, setNotes] = useState([]);

  //editing note
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingNote, setEditingNote] = useState({ title: '', details: '' });

  //form states
  const [isAddFormOpen, setisAddFormOpen] = useState(false);
  const [isAllComplete, setIsAllComplete] = useState(false);

  function handleAdd(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    setisAddFormOpen(false);
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
        <Button size='medium' type='dashed' label='Add new task' onClick={openInput} leadingIcon={<AddIcon/>}></Button>
      </div>
      {notes.map((note, index) => {
        if (index === editingId && note && isTaskFormOpen) {
          return (
            <TaskForm
              key={index}
              onSave={handleSave}
              onClose={handleCancel}
              title={editingNote.title}
              details={editingNote.details}
              header='Edit task'
            />
          );
        }
        return null;
      })}

     
      {isAddFormOpen && <AddTaskForm onAdd={handleAdd} onClose={closeInput} />}
      {isAllComplete && <Button size='medium' type='secondary' label='Undo' onClick={handleUndo}></Button>}
  
    </>
  );
}

export default App;

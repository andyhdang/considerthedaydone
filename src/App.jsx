import { useState, useEffect } from "react";
import "./App.css";

//External Library
import confetti from "canvas-confetti";

//Icons
import AddIcon from "@mui/icons-material/Add";

//Components
import Header from "./components/Header";
import Button from "./components/Button/Button";
import Note from "./components/Note/Note";
import TaskForm from "./components/TaskForm/TaskForm";
import Alert from "./components/Alert/Alert";

function App() {
  //list of notes
  const [notes, setNotes] = useState([]);

  //states for editing notes
  const [IsEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingNote, setEditingNote] = useState({ title: "", details: "" });

  //states for adding notes
  const [isFormOpen, setIsFormOpen] = useState(false);

  //state for all tasks completed
  const [isAllComplete, setIsAllComplete] = useState(false);

  //function to add new note
  function handleAdd(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    setIsFormOpen(false);
  }

  //function to mark note as done
  function handleDone(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((note, index) => {
        if (index === id) {
          return {
            ...note,
            isComplete: !note.isComplete, //to track when all notes are completed
          };
        }
        return note;
      });
    });
  }

  //function to edit note
  function handleEdit(id) {
    setIsEditFormOpen(true);
    setEditingId(id);
    setEditingNote(notes[id]);
  }

  //function to save edited note
  function handleSave(newNote) {
    setNotes((prevNotes) => {
      return prevNotes.map((note, index) => {
        if (index === editingId) {
          return newNote;
        }
        return note;
      });
    });
    setEditingId(null);
  }

  //function to close form
  function handleCancel() {
    setEditingId(null);
    setIsFormOpen(false);
    setIsEditFormOpen(false);
  }

  //function to undo all completed tasks
  function handleUndo() {
    window.location.reload();
  }

  //check if all tasks are completed
  useEffect(() => {
    const allComplete = notes.every((note) => note.isComplete);
    if (allComplete && notes.length > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 1000,
      });
      setIsAllComplete(true);
    }
  }, [notes]);

  //function to open task form
  function openInput() {
    setIsFormOpen(true);
  }

  return (
    <>
      <Header />
      
      {isAllComplete && (
        <Alert
        onUndo={handleUndo}
        />
      )}
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
        {isAllComplete == false &&
          <Button
            size="medium"
            type="dashed"
            label="Add new task"
            onClick={openInput}
            leadingIcon={<AddIcon />}
          ></Button>}

      </div>
      {notes.map((note, index) => {
        if (index === editingId && note && IsEditFormOpen) {
          return (
            <TaskForm
              key={index}
              onSave={handleSave}
              onClose={handleCancel}
              onAdd={handleAdd}
              title={editingNote.title}
              details={editingNote.details}
              header="Edit task"
              save={true}
              add={false}
            />
          );
        }
        return null;
      })}

      {isFormOpen && (
        <TaskForm
          onClose={handleCancel}
          onAdd={handleAdd}
          header="Add task"
          save={false}
          add={true}
        />
      )}

    </>
  );
}

export default App;

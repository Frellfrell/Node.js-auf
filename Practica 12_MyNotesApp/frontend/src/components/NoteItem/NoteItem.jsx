import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { delete_Note, update_Note } from "../../redux/notesSlice";
import styles from "./NoteItem.module.css";

function NoteItem({ note }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const handleSave = () => {
    dispatch(update_Note({ id: note.id, title, text }));
    setIsEditing(false);
  };

  return (
    <div className={styles.note}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text"
          />
          <div className={styles.actions}>
            <button className={styles.saveButton} onClick={handleSave}>
              💾 Save
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(delete_Note(note.id))}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.viewContainer}>
          <h3 className={styles.noteTitle}>{note.title}</h3>
          <p className={styles.noteText}>{note.text}</p>
          <div className={styles.actions}>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              ✏️
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(delete_Note(note.id))}
            >
              🗑
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteItem;

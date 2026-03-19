import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../redux/App.jsx";
import styles from "./NoteItem.module.css";

function NoteItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    dispatch(updateTodo({ id: todo._id, title, text }));
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
              onClick={() => dispatch(deleteTodo(todo._id))}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.viewContainer}>
          <h3 className={styles.noteTitle}>{todo.title}</h3>
          <p className={styles.noteText}>{todo.text}</p>
          <div className={styles.actions}>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              ✏️
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(deleteTodo(todo._id))}
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

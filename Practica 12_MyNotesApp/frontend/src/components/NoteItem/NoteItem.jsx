import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../redux/App.js";
import styles from "./NoteItem.module.css";

function NoteItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [text, setText] = useState(todo.text);
  const [complete, setComplete] = useState(todo.complete);

  const handleSave = () => {
    dispatch(updateTodo({ id: todo._id, title, text, complete }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const toggleComplete = () => {
    setComplete((prev) => !prev);
    dispatch(
      updateTodo({
        id: todo._id,
        todo: { title, text, complete: !complete },
      }),
    );
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
          <h3 className={styles.noteTitle}>{title}</h3>
          <p className={styles.noteText}>{text}</p>
          <div className={styles.actions}>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              ✏️
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              🗑
            </button>
            <button
              className={styles.completeButton}
              onClick={toggleComplete}
              style={{ backgroundColor: complete ? "#c5a880" : "#f0d6b2" }}
            >
              {complete ? "✅ Done" : "⬜ Pending"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteItem;

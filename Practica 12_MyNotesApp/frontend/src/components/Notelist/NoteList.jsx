import React from "react";
import { useSelector } from "react-redux";
import NoteItem from "../NoteItem/NoteItem";
import styles from "./NoteList.module.css";

function NoteList() {
  const todos = useSelector((state) => state.todos);

  if (todos.length === 0) {
    return <p className={styles.empty}>NO Notes Available</p>;
  }

  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <NoteItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default NoteList;

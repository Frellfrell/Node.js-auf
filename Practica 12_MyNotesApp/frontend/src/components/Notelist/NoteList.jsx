import React from "react";
import { useSelector } from "react-redux";
import NoteItem from "../NoteItem/NoteItem";
import styles from "./NoteList.module.css";

function NoteList() {
  const notes = useSelector((state) => state.notes);

  if (notes.length === 0) {
    return <p className={styles.empty}>NO Notes Available</p>;
  }

  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;

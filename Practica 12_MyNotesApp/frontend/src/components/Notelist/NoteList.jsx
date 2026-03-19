import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NoteItem from "../NoteItem/NoteItem";
import { fetchTodos } from "../../redux/App.jsx";
import styles from "./NoteList.module.css";
import { useEffect } from "react";

function NoteList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (todos.length === 0) {
    return <p className={styles.empty}>NO Notes Available</p>;
  }

  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <NoteItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default NoteList;

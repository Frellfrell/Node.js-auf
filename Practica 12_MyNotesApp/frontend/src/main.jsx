import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotesApp from "./NotesApp";
import { store } from "./redux/App.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <NotesApp />
    </Provider>
  </StrictMode>,
);

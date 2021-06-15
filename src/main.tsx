import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./style.css";
import ThemeProvider from "./context/ThemeContext";
import TodoProvider from "./features/context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </React.StrictMode>
);

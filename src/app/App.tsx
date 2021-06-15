import { useReducer, useState } from "react";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";

import { TodoItemProps } from "../components/TodoItem";
import todosReducer, { initialTodos } from "../features/todos";

const App = () => {
  let nextId = 1;
  /* const initialTodos = [
    { id: 0, text: "Visit Kafka Museum", isCompleted: true },
  ]; */
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  const handleAddTodo = (text: string) => {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    });
  };

  const handleRemoveTodo = (id: number) => {
    dispatch({
      type: "deleted",
      id,
    });
  };

  const handleCompleteTodo = (id: number) => {
    dispatch({
      type: "changed",
      id,
    });
  };

  const handleClearTodo = () => {
    dispatch({
      type: "clear",
      isCompleted: false,
    });
  };

  const [filter, setFilter] = useState("All");

  const filtersObject = {
    All: () => true,
    Active: (task: { isCompleted: any }) => !task.isCompleted,
    Completed: (task: { isCompleted: any }) => task.isCompleted,
  };

  const filterNames = Object.keys(filtersObject);

  const handleChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const countItems = todos.length !== 1 ? "items" : "item";
  const countActiveTodo = todos.filter(
    (todo: TodoItemProps) => todo.isCompleted === false
  );
  const countItemsText = `${countActiveTodo.length} ${countItems} left`;
  const todosLength = todos.length;

  return (
    <>
      <BackgroundImage />

      <div className="todo-app">
        <Header />

        <AddTodo onAddTodo={handleAddTodo} />

        <TodoList
          todos={todos}
          onRemoveTodo={handleRemoveTodo}
          onCompleteTodo={handleCompleteTodo}
          filtersObject={filtersObject}
          filter={filter}
        />

        <Footer
          todosLength={todosLength}
          count={countItemsText}
          onClearTodo={handleClearTodo}
          filterNames={filterNames}
          onChangeFilter={handleChangeFilter}
        />
      </div>
    </>
  );
};

export default App;

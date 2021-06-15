import { useState } from "react";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";
import Todo from "../utils/Todo";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { TodoItemProps } from "../components/TodoItem";

const App = () => {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: Todo.generateRandomID(),
      text,
      isCompleted: false,
    };
    setStoredTodos([...storedTodos, newTodo]);
  };

  const handleRemoveTodo = (id: string) => {
    const filteredTodos = storedTodos.filter(
      (todo: TodoItemProps) => todo.id !== id
    );
    setStoredTodos(filteredTodos);
  };

  const handleCompleteTodo = (id: string) => {
    const updatedTodos = storedTodos.map((todo: TodoItemProps) => {
      if (id === todo.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setStoredTodos(updatedTodos);
  };

  const handleClearTodo = () => {
    const clearedTodos = storedTodos.filter(
      (todo: TodoItemProps) => todo.isCompleted === false
    );

    setStoredTodos(clearedTodos);
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

  const countItems = storedTodos.length !== 1 ? "items" : "item";
  const countActiveTodo = storedTodos.filter(
    (todo: TodoItemProps) => todo.isCompleted === false
  );
  const countItemsText = `${countActiveTodo.length} ${countItems} left`;
  const todosLength = storedTodos.length;

  return (
    <>
      <BackgroundImage />

      <div className="todo-app">
        <Header />

        <AddTodo onAddTodo={handleAddTodo} />

        <TodoList
          todos={storedTodos}
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

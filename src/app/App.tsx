import { useState } from "react";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";

import { useTodos } from "../features/context";

const App = () => {
  const { todos } = useTodos();

  const [filter, setFilter] = useState("All");

  const filtersObject = {
    All: () => true,
    Active: (task: { isCompleted: boolean }) => !task.isCompleted,
    Completed: (task: { isCompleted: boolean }) => task.isCompleted,
  };

  const handleChangeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filterNames = Object.keys(filtersObject);
  const countItems = todos.length !== 1 ? "items" : "item";
  const countActiveTodo = todos.filter(
    (todo: any) => todo.isCompleted === false
  );
  const countItemsText = `${countActiveTodo.length} ${countItems} left`;
  const todosLength = todos.length;

  return (
    <>
      <BackgroundImage />

      <div className="todo-app">
        <Header />
        <AddTodo />
        <TodoList filter={filter} filtersObject={filtersObject} />
        <Footer
          count={countItemsText}
          todosLength={todosLength}
          filterNames={filterNames}
          onChangeFilter={handleChangeFilter}
        />
      </div>
    </>
  );
};

export default App;

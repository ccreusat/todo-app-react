import React, { useState } from "react";
import { useTodos } from "../../features/context";
import useFetch from "../../hooks/useFetch";

const AddTodo = () => {
  const { handleAddTodo } = useTodos();

  const [value, setValue] = useState("");

  const handleOnSubmit = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const handleOnAdd = () => {
    if (value) {
      handleAddTodo?.(value);
      setValue("");
    }
  };

  const handleOnKeyPress = ({ key }: React.KeyboardEvent<object>) => {
    if (value) {
      if (key === "Enter" || key === "13") {
        handleAddTodo?.(value);
        setValue("");
      }
    }
  };

  return (
    <div className="todo add">
      <label htmlFor="add-todo" className="todo__label">
        <div
          id="add-checkbox"
          className="todo__checkbox"
          onClick={() => handleOnAdd()}
        ></div>
        <div className="todo__container">
          <input
            className="todo__input"
            type="text"
            name="add-todo"
            id="add-input"
            placeholder="Create a new todo"
            value={value}
            onChange={event => handleOnSubmit(event)}
            onKeyPress={event => handleOnKeyPress(event)}
          />
        </div>
      </label>
    </div>
  );
};

export default AddTodo;

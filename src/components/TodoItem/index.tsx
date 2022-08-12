import clsx from "clsx";
import { useTodos } from "../../features/context";

export interface TodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
}
const TodoItem = ({ id, text, isCompleted }: TodoItemProps) => {
  const { handleCompleteTodo, handleRemoveTodo } = useTodos();

  const classNames = clsx({
    todo: true,
    completed: isCompleted,
  });

  return (
    <div className={classNames} key={id} data-id={id}>
      <label className="todo__label">
        <input
          type="checkbox"
          id={id}
          name="checkbox"
          className="todo__checkbox"
          defaultChecked={isCompleted}
          onChange={() => console.log("change")}
          onClick={() => handleCompleteTodo(id)}
        />
        <span className="todo__text">{text}</span>
      </label>
      <span
        className="todo__delete"
        onClick={() => handleRemoveTodo(id)}
      ></span>
    </div>
  );
};

export default TodoItem;

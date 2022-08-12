import { useTodos } from "../../features/context";
import TodoItem, { TodoItemProps } from "../TodoItem";

interface TodoListProps {
  filtersObject: any;
  filter: string;
}

const TodoList = ({ filtersObject, filter }: TodoListProps) => {
  const { todos } = useTodos();

  const noCompletedTodos = () => {
    const filteredTodos = todos.filter(
      (todo: TodoItemProps) => todo.isCompleted === true
    );
    if (filter === "Completed" && !filteredTodos.length) {
      return <p className="none-completed">No completed todo yet!</p>;
    }
  };

  return (
    <div id="todoList" className="todo-list">
      {noCompletedTodos()}

      {todos.filter(filtersObject[filter]).map((todo: TodoItemProps) => {
        return (
          <TodoItem
            key={`item-${todo.id}`}
            id={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
          />
        );
      })}
    </div>
  );
};

export default TodoList;

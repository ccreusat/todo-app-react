import TodoItem from "../TodoItem";

export interface TodoActionsProps {
  onAddTodo?: (text: string) => void;
  onCompleteTodo?: (id: string) => void;
  onRemoveTodo?: (id: string) => void;
  onClearTodo?: () => void;
}

interface TodoListProps extends TodoActionsProps {
  todos: any[];
  filtersObject: any;
  filter: string;
}

const TodoList = ({
  todos,
  onCompleteTodo,
  onRemoveTodo,
  filtersObject,
  filter,
}: TodoListProps) => {
  const noCompletedTodos = () => {
    const filteredTodos = todos.filter(todo => todo.isCompleted === true);
    if (filter === "Completed" && !filteredTodos.length) {
      return <p className="none-completed">No completed todo yet!</p>;
    }
  };

  return (
    <div id="todoList" className="todo-list">
      {noCompletedTodos()}

      {todos.filter(filtersObject[filter]).map(todo => {
        return (
          <TodoItem
            key={`item-${todo.id}`}
            id={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            onCompleteTodo={onCompleteTodo}
            onRemoveTodo={onRemoveTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;

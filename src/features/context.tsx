import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import todosReducer from "./todos";
import { v4 as uuidv4 } from "uuid";

interface TodoContextProps {
  todos: string[];
  handleAddTodo: (text: string) => void;
  handleRemoveTodo: (id: string) => void;
  handleCompleteTodo: (id: string) => void;
  handleClearTodo: () => void;
}
export const TodoContext = createContext<TodoContextProps>(null!);

export default function TodoProvider({ children }: PropsWithChildren) {
  // const initialTodos = useLocalStorage("todos", []);
  const initialTodos: any[] = [];
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  const handleAddTodo = (text: string) => {
    dispatch({
      type: "added",
      id: uuidv4(),
      text: text,
    });
  };

  const handleRemoveTodo = (id: string) => {
    dispatch({
      type: "deleted",
      id,
    });
  };

  const handleCompleteTodo = (id: string) => {
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

  const value = {
    todos,
    handleAddTodo,
    handleRemoveTodo,
    handleCompleteTodo,
    handleClearTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};

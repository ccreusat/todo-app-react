import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import todosReducer from "./todos";
import { v4 as uuidv4 } from "uuid";
import useFetch from "../hooks/useFetch";

interface TodoContextProps {
  todos: any[];
  handleAddTodo: (text: string) => void;
  handleRemoveTodo: (id: string) => void;
  handleCompleteTodo: (id: string) => void;
  handleClearTodo: () => void;
}
export const TodoContext = createContext<TodoContextProps>(null!);

export default function TodoProvider({ children }: PropsWithChildren) {
  const initialTodos: any[] = [];
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const { get, post } = useFetch("https://api.jsonbin.io/v3/b");

  useEffect(() => {
    (async () => {
      const data = await get("62ee3927e13e6063dc6e0234").then(data => data);
      getTodos(data.todos);
    })();
  }, []);

  const getTodos = (todos: any) => {
    dispatch({
      type: "fetch",
      todos,
    });
  };

  const handleAddTodo = (text: string) => {
    post("62ee3927e13e6063dc6e0234", {
      id: uuidv4(),
      text: text,
      isCompleted: false,
    }).then(data => {
      console.log("data", data);
    });
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

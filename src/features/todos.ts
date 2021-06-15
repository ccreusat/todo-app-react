import { TodoItemProps } from "../components/TodoItem";
// import { useLocalStorage } from "../hooks/useLocalStorage";

type Actions =
  | {
      type: "added";
      id: string;
      text: string;
    }
  | { type: "changed"; id: string }
  | { type: "clear"; isCompleted: boolean }
  | {
      type: "deleted";
      id: string;
    };

export default function todosReducer(todos: any, action: Actions) {
  switch (action.type) {
    case "added": {
      return [
        ...todos,
        {
          id: action.id,
          text: action.text,
          isCompleted: false,
        },
      ];
    }
    case "changed": {
      return todos.map((todo: TodoItemProps) => {
        if (action.id === todo.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    }
    case "clear": {
      return todos.filter(
        (todo: TodoItemProps) => todo.isCompleted === action.isCompleted
      );
    }
    case "deleted": {
      return todos.filter((todo: TodoItemProps) => todo.id !== action.id);
    }
    default: {
      throw Error("Unknown action:");
    }
  }
}

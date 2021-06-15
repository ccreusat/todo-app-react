import clsx from "clsx";
import { TodoActionsProps } from "../TodoList";

interface FooterProps extends TodoActionsProps {
  todosLength: any;
  count: string;
  filterNames: any[];
  onChangeFilter: (filter: string) => void;
}

const Footer = ({
  todosLength,
  count,
  onClearTodo,
  filterNames,
  onChangeFilter,
}: FooterProps) => {
  const classnames = clsx("todos-footer", {
    flex: todosLength > 0,
    none: todosLength < 0,
  });

  return (
    <footer id="footer" className={classnames}>
      <p id="count" className="todos-footer__count">
        {count}
      </p>
      <div className="filter-buttons">
        {filterNames.map((filter, index) => {
          return (
            <label
              key={index}
              className="filter-label"
              htmlFor={`filter-${filter}`}
            >
              <input
                className="filter-radio"
                type="radio"
                name="filter"
                id={`filter-${filter}`}
                defaultChecked={filter === "All"}
                onClick={() => onChangeFilter(filter)}
              />
              <span>{filter}</span>
            </label>
          );
        })}
      </div>
      <span
        className="clear"
        aria-label="Clear Completed"
        id="clear"
        onClick={() => onClearTodo?.()}
      >
        Clear Completed
      </span>
    </footer>
  );
};

export default Footer;

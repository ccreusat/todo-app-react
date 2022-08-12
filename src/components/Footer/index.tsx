import clsx from "clsx";
import { useTodos } from "../../features/context";

interface FooterProps {
  todosLength: any;
  count: string;
  filterNames: any[];
  onChangeFilter: (filter: string) => void;
}

const Footer = ({
  todosLength,
  count,
  filterNames,
  onChangeFilter,
}: FooterProps) => {
  const { handleClearTodo } = useTodos();

  const classNames = clsx("todos-footer", {
    flex: todosLength > 0,
    none: todosLength < 0,
  });

  return (
    <footer id="footer" className={classNames}>
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
        onClick={() => handleClearTodo()}
      >
        Clear Completed
      </span>
    </footer>
  );
};

export default Footer;

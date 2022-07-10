import { useState } from "react";

const TodoInput = ({ onTodoAdd }) => {
  const [todoInput, setTodoInput] = useState("");
  const onAdd = (e) => {
    e.preventDefault();
    onTodoAdd(todoInput);
    setTodoInput("");
  };
  return (
    <form className="todo-input">
      <input
        placeholder="Add Todo entry"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button onClick={onAdd} type="submit">
        Add
      </button>
    </form>
  );
};

export default TodoInput;

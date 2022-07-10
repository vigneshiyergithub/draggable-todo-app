import "./App.css";
import TodoContent from "./components/TodoContent";
import TodoInput from "./components/TodoInput";
import { useState, useEffect } from "react";
import { TODO_STATE } from "./utils/common";
import { v4 as uuidv4 } from "uuid";

const getTodosFromLocalStorage = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const setTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

function App() {
  const [todos, setTodos] = useState(getTodosFromLocalStorage());
  const onTodoAdd = (todoText) => {
    setTodos((_t) => {
      return [
        ..._t,
        {
          id: uuidv4(),
          value: todoText,
          state: TODO_STATE.NOT_STARTED,
        },
      ];
    });
  };
  const onTodoDrag = (id, state) => {
    setTodos((_t) =>
      _t.map((t) => {
        if (t.id === id) {
          return { ...t, state };
        }
        return t;
      })
    );
  };
  useEffect(() => {
    setTodosToLocalStorage(todos);
  }, [todos]);
  const onTodoDelete = (id) => {
    setTodos((_t) => _t.filter((t) => t.id !== id));
  };
  return (
    <div className="App">
      <header>Draggable Todo List</header>
      <TodoInput onTodoAdd={onTodoAdd} />
      <TodoContent
        todos={todos}
        onTodoDrag={onTodoDrag}
        onTodoDelete={onTodoDelete}
      />
    </div>
  );
}

export default App;

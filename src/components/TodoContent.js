import { TODO_STATE } from "../utils/common";
import DraggableItemContainer from "./DraggableItemContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import DeleteDragItemBox from "./DeleteDragItemBox";

const getTodosBasedOnState = (todos, state) => {
  return todos.filter((t) => t.state === state);
};

const TodoContent = ({ todos, onTodoDrag, onTodoDelete }) => {
  const notStartedTodos = getTodosBasedOnState(todos, TODO_STATE.NOT_STARTED);
  const inProgressTodos = getTodosBasedOnState(todos, TODO_STATE.IN_PROGRESS);
  const doneTodos = getTodosBasedOnState(todos, TODO_STATE.DONE);
  const [isDragActive, setIsDragActive] = useState(false);
  const onDragActive = (dragActive) => {
    setIsDragActive(dragActive);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-content">
        <DraggableItemContainer
          title="Not Started"
          todos={notStartedTodos}
          onTodoDrag={onTodoDrag}
          state={TODO_STATE.NOT_STARTED}
          onDragActive={onDragActive}
          onTodoDelete={onTodoDelete}
        />
        <DraggableItemContainer
          title="In Progress"
          todos={inProgressTodos}
          onTodoDrag={onTodoDrag}
          state={TODO_STATE.IN_PROGRESS}
          onDragActive={onDragActive}
          onTodoDelete={onTodoDelete}
        />
        <DraggableItemContainer
          title="Done"
          todos={doneTodos}
          onTodoDrag={onTodoDrag}
          state={TODO_STATE.DONE}
          onDragActive={onDragActive}
          onTodoDelete={onTodoDelete}
        />
      </div>
      {isDragActive && (
        <div className="delete-drag-container">
          <DeleteDragItemBox />
        </div>
      )}
    </DndProvider>
  );
};

export default TodoContent;

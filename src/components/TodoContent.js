import { TODO_STATE } from "../utils/common";
import DraggableItemContainer from "./DraggableItemContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const getTodosBasedOnState = (todos, state) => {
  return todos.filter((t) => t.state === state);
};

const TodoContent = ({ todos, onTodoDrag }) => {
  const notStartedTodos = getTodosBasedOnState(todos, TODO_STATE.NOT_STARTED);
  const inProgressTodos = getTodosBasedOnState(todos, TODO_STATE.IN_PROGRESS);
  const doneTodos = getTodosBasedOnState(todos, TODO_STATE.DONE);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="todo-content">
        <DraggableItemContainer
          title="Not Started"
          todos={notStartedTodos}
          onTodoDrag={onTodoDrag}
          state={TODO_STATE.NOT_STARTED}
        />
        <DraggableItemContainer
          title="In Progress"
          todos={inProgressTodos}
          onTodoDrag={onTodoDrag}
          state={TODO_STATE.IN_PROGRESS}
        />
        <DraggableItemContainer
          title="Done"
          todos={doneTodos}
          onTodoDrag={onTodoDrag}
          state={TODO_STATE.DONE}
        />
      </div>
    </DndProvider>
  );
};

export default TodoContent;

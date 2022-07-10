import { useDrag } from "react-dnd";
import { ITEM_TYPES, TODO_STATE } from "../utils/common";

const DraggableItem = ({ todo, onTodoDrag, onDragActive, onTodoDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.TODO,
    item: { todo },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (!dropResult.delete) {
          onTodoDrag(item.todo.id, dropResult.state);
        } else {
          onTodoDelete(item.todo.id);
        }
        onDragActive(false);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    isDragging: (monitor) => {
      if (todo.id === monitor.getItem().todo.id) {
        onDragActive(true);
      }
    },
  }));
  const opacity = isDragging ? 0.4 : 1;
  const textDecoration =
    todo.state === TODO_STATE.DONE ? "line-through" : "none";
  let backgroundColor = "";
  switch (todo.state) {
    case TODO_STATE.NOT_STARTED: {
      console.log("here");
      backgroundColor = "lightcoral";
      break;
    }
    case TODO_STATE.IN_PROGRESS: {
      backgroundColor = "lightyellow";
      break;
    }
    case TODO_STATE.DONE: {
      backgroundColor = "lightgreen";
      break;
    }
    default: {
      backgroundColor = "white";
      break;
    }
  }
  return (
    <div
      className="draggable-item"
      ref={drag}
      style={{ opacity, textDecoration, backgroundColor }}
    >
      {todo.value}
    </div>
  );
};

export default DraggableItem;

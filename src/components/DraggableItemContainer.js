import DraggableItem from "./DraggableItem";
import { useDrop } from "react-dnd";
import { ITEM_TYPES } from "../utils/common";

const DraggableItemContainer = ({
  title = "",
  todos = [],
  onTodoDrag,
  state,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.TODO,
    drop: () => ({ state }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  const style = {
    border: isActive ? "3px dashed black" : "1px solid black",
  };
  return (
    <div className="draggable-item-container" ref={drop} style={style}>
      <h4 className="title">{title}</h4>
      <div className="content">
        {todos.map((t) => {
          return <DraggableItem key={t.id} todo={t} onTodoDrag={onTodoDrag} />;
        })}
      </div>
    </div>
  );
};

export default DraggableItemContainer;

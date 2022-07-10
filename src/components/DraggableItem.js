import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "../utils/common";

const DraggableItem = ({ todo, onTodoDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.TODO,
    item: { todo },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onTodoDrag(item.todo.id, dropResult.state);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div className="draggable-item" ref={drag} style={{ opacity }}>
      {todo.value}
    </div>
  );
};

export default DraggableItem;

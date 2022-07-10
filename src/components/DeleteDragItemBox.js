import { useDrop } from "react-dnd";
import { ITEM_TYPES } from "../utils/common";
import { ReactComponent as DeleteIcon } from "../delete-svgrepo-com.svg";

const DeleteDragItemBox = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.TODO,
    drop: () => ({ delete: true }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  const style = {
    border: isActive ? "3px dashed black" : "none",
  };
  return (
    <div className="delete-drag-box" style={style} ref={drop}>
      <DeleteIcon width={'4rem'}/>
    </div>
  );
};

export default DeleteDragItemBox;

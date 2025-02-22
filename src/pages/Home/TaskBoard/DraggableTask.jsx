import { FaEdit, FaTrash } from "react-icons/fa";
import { useDraggable } from "@dnd-kit/core";
import { PropTypes } from "prop-types";
import { useMemo } from "react";
import { handleDelete, handleUpdate } from "../../../Api/utils";

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = useMemo(
    () =>
      transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : {},
    [transform]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white dark:bg-[#1e2939] dark:border dark:border-blue-600 p-3 rounded-lg shadow-md flex justify-between items-center cursor-grab"
    >
      <div>
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
      </div>

      <div className="flex space-x-2">
        <button
          onMouseDown={() => handleUpdate(task._id)}
          className="text-blue-500 hover:text-blue-700"
          aria-label="Edit Task"
        >
          <FaEdit size={18} />
        </button>
        <button
          onMouseDown={() => handleDelete(task._id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete Task"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

DraggableTask.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default DraggableTask;

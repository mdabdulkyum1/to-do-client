import PropTypes from "prop-types";
import DraggableTask from "./DraggableTask";
import { useDroppable } from "@dnd-kit/core";

const TaskColumn = ({ category, tasks }) => {
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-[#1e2939] p-4 rounded-lg shadow-md min-h-[250px] flex flex-col"
      aria-label={`Task column for ${category}`}
    >
      <h2 className="text-xl font-semibold mb-3">{category}</h2>
      <div className="space-y-3 flex-1">
        {tasks.length > 0 ? (
          tasks.map((task) => <DraggableTask key={task._id} task={task} />)
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
};

TaskColumn.propTypes = {
  category: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskColumn;

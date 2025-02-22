import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import useAxiosPublic from "../../../hooks/AxiosPublic/useAxiosPublic";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import { handelReordered } from "../../../Api/utils";

const socket = io(`${import.meta.env.VITE_server_url}`); // Ensure correct backend URL

const TaskBoard = () => {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    socket.on("taskUpdated", fetchTasks);
    return () => socket.off("taskUpdated");
  }, []); // Only runs once on mount

  const fetchTasks = async () => {
    try {
      const { data } = await axiosPublic.get("/tasks");
      setTasks(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const categories = ["To-Do", "In Progress", "Done"];
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task._id === active.id);
    if (oldIndex === -1) {
      console.error("Error: Task not found.");
      return;
    }

    const draggedTask = tasks[oldIndex];
    const targetCategory = over.id;

    // Get target position within the same category
    const categoryTasks = tasks.filter((task) => task.category === targetCategory);
    const targetTask = categoryTasks.find((task) => task._id === over.id);

    let newIndex = targetTask ? categoryTasks.indexOf(targetTask) : categoryTasks.length;

    let updatedTasks = [...tasks];

    if (draggedTask.category !== targetCategory) {
      updatedTasks = tasks.map((task) =>
        task._id === active.id
          ? { ...task, category: targetCategory, order: newIndex }
          : task
      );
    } else {
      updatedTasks = arrayMove(tasks, oldIndex, newIndex);
    }

    setTasks(updatedTasks);

    const reorderedTasks = updatedTasks.map(({ _id, category, order }) => ({
      _id,
      category,
      order,
    }));

    await handelReordered(reorderedTasks);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <TaskColumn
            key={category}
            category={category}
            tasks={tasks.filter((task) => task.category === category)}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;

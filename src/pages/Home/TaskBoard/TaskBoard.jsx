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
import {
  arrayMove,
} from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";

const socket = io("https://to-do-server-production-220c.up.railway.app"); // Update this with your backend URL

const TaskBoard = () => {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    socket.on("taskUpdated", fetchTasks);
    return () => socket.off("taskUpdated");
  }, []);

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
      console.error("Error: Active task not found in the list.");
      return;
    }
  
    const draggedTask = tasks[oldIndex];
    const targetCategory = over.id; // Example: "To-Do"
  
    // Find first task in the target category to determine index
    const targetTask = tasks.find((task) => task.category === targetCategory);
    let newIndex = tasks.findIndex((task) => task._id === targetTask?._id);
  
    // If category is empty, place the dragged task at the end
    if (!targetTask) {
      newIndex = tasks.length;
    }
  
    let updatedTasks = [...tasks];
  
    if (draggedTask.category !== targetCategory) {
      // Change category and update order
      updatedTasks = tasks.map((task) =>
        task._id === active.id
          ? { ...task, category: targetCategory, order: newIndex }
          : task
      );
    } else {
      // Reorder within the same category
      updatedTasks = arrayMove(tasks, oldIndex, newIndex);
    }
  
    setTasks(updatedTasks);
  
    try {
      await axiosPublic.patch(`/tasks/reorder/${active.id}`, {
        category: targetCategory,
        order: newIndex,
      });
  
      socket.emit("taskUpdated");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  
  

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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

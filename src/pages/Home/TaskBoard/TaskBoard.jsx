import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import useAxiosPublic from "../../../hooks/AxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";

const socket = io("http://localhost:5000"); // Connect to backend

const TaskBoard = () => {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const { data } = await axiosPublic.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();

    socket.on("taskUpdated", () => {
      fetchTasks();
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, []);

const handleUpdate = async (id) => {
    const { data } = await axiosPublic.get(`/tasks/${id}`);
    console.log(data);
  
    if (!data) {
      return;
    }
  
    const { value: formValues } = await Swal.fire({
      title: "Update Task",
      html: `
        <form id="task-form" class="space-y-4">
          <!-- Task Title -->
          <div class="flex flex-col">
            <label for="title" class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Title (Max 50 Characters)
            </label>
            <input 
              id="title"
              type="text"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter task title"
              maxlength="50"
              required
            />
          </div>
  
          <!-- Task Description -->
          <div class="flex flex-col">
            <label for="description" class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Description (Max 200 Characters)
            </label>
            <textarea 
              id="description"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter task description" 
              rows="3" 
              maxlength="200"
            ></textarea>
          </div>
  
          <!-- Task Category -->
          <div class="flex flex-col">
            <label for="category" class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Category
            </label>
            <select 
              id="category" 
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      `,
      focusConfirm: false,
      confirmButtonText: "Update Task",
      confirmButtonColor: "#2A4D69",
      showCancelButton: true,
      preConfirm: async () => {
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const category = document.getElementById("category").value;
  
        // Validation
        if (!title) {
          Swal.showValidationMessage("Title is required!");
          return false;
        }
        if (title.length > 50) {
          Swal.showValidationMessage("Title must not exceed 50 characters!");
          return false;
        }
        if (!description) {
          Swal.showValidationMessage("Description is required!");
          return false;
        }
        if (description.length > 200) {
          Swal.showValidationMessage("Description must not exceed 200 characters!");
          return false;
        }
        if (!category || !["To-Do", "In Progress", "Done"].includes(category)) {
          Swal.showValidationMessage("Please select a valid category!");
          return false;
        }
  
        return {
          title,
          description,
          category
        };
      },
      didOpen: () => {
        // After the popup is opened, set the values dynamically
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.description;
        document.getElementById("category").value = data.category;
      },
    });
  
    if (formValues) {
      try {
        const { data } = await axiosPublic.patch(`/tasks/${id}`, formValues); // Using PUT to update the task
        if (data.modifiedCount > 0) {
          Swal.fire("Task Updated!", "Task has been updated successfully.", "success");
        } else {
          Swal.fire("Error!", "Task update failed. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error in UpdateTask:", error);
        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
      }
    }
  };
  


const handleDelete = async (taskId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to undo this action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/tasks/${taskId}`);
        socket.emit("taskUpdated"); // Notify server

        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire("Error!", "Failed to delete the task.", "error");
      }
    }
  });
};


  const categories = ["To-Do", "In Progress", "Done"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category} className="bg-gray-100 dark:bg-[#1e2939] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">{category}</h2>

          <div className="space-y-3 min-h-[200px]">
            {tasks
              .filter((task) => task.category === category)
              .map((task) => (
                <div key={task._id} className="bg-white dark:bg-[#1e2939] dark:border dark:border-blue-600 p-3 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2">
                    <button onClick={() => handleUpdate(task._id)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;

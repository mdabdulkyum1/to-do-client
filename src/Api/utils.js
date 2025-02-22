import axios from "axios";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
const socket = io(`${import.meta.env.VITE_server_url}`); // Update this with your backend URL


const image_hosting_key = import.meta.env.VITE_IMGBB_API_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export const  imageUpload = async imageData => {
    
    const formData = new FormData();
    formData.append('image', imageData)

    const { data } = await axios.post( image_hosting_api , formData);

    return data.data.display_url;

}


export const saveUser = async (user) => {
    const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL
    }
    const {data} = await axios.post(`${import.meta.env.VITE_server_url}/users`, userInfo);
    return data;
}


  export const handleUpdate = async (id) => {
    const { data } = await axios.get(`${import.meta.env.VITE_server_url}/tasks/${id}`);

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
          Swal.showValidationMessage(
            "Description must not exceed 200 characters!"
          );
          return false;
        }
        if (!category || !["To-Do", "In Progress", "Done"].includes(category)) {
          Swal.showValidationMessage("Please select a valid category!");
          return false;
        }

        return {
          title,
          description,
          category,
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
        const { data } = await axios.patch(`${import.meta.env.VITE_server_url}/${id}`, formValues); // Using PUT to update the task
        if (data.modifiedCount > 0) {
          Swal.fire(
            "Task Updated!",
            "Task has been updated successfully.",
            "success"
          );
        } else {
          Swal.fire("Error!", "Task update failed. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error in UpdateTask:", error);
        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
      }
    }
  };

  export const handleDelete = async (taskId) => {
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
          await axios.delete(`${import.meta.env.VITE_server_url}/tasks/${taskId}`);
          socket.emit("taskUpdated");
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Error!", "Failed to delete the task.", "error");
        }
      }
    });
  };


  
export const handelReordered = async (reorderedTasks) => {
  if (!Array.isArray(reorderedTasks) || reorderedTasks.length === 0) {
    console.warn("No valid tasks provided for reordering.");
    return;
  }

  try {
    const response = await axios.patch(`${import.meta.env.VITE_server_url}/tasks/reorder`, {
      tasks: reorderedTasks,
    });

    return response.data; // Optionally return response for further handling
  } catch (error) {
    console.error("Error updating task order:", error.response?.data || error.message);
  }
};


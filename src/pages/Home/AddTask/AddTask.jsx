import useAuth from "../../../hooks/GetAuthInfo/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from './../../../hooks/AxiosPublic/useAxiosPublic';

const AddTask = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handelAddTask = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add Task",
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
      confirmButtonText: "Add Task",
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
        if (description.length > 200) {
          Swal.showValidationMessage(
            "Description must not exceed 200 characters!"
          );
          return false;
        }
        if (!description) {
          Swal.showValidationMessage(
            "Title is required!"
          );
          return false;
        }
        if (!category || !["To-Do", "In Progress", "Done"].includes(category)) {
          Swal.showValidationMessage("Please select a valid category!");
          return false;
        }

        // Auto-generated timestamp
        const timestamp = new Date().toISOString();

        return {
          email: user?.email,
          title,
          description,
          category,
          timestamp,
        };

      },
    });

    if (formValues) {
       try{
        const {data} = await axiosPublic.post("/tasks", formValues);
        if(data.insertedId){
          Swal.fire("Task Added!", "Task has been added successfully.", "success");
        }
          
       }catch(error){
         console.error("Error in AddTask:", error);
        }
    }
  };

  return (
    <section className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Task Management</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={handelAddTask}
          className="btn bg-blue-500 dark:bg-yellow-400 text-white dark:text-black rounded-lg shadow"
        >
          Add Task
        </button>
        <img
          src={user?.photoURL}
          alt="User Profile"
          className="w-10 h-10 rounded-full border dark:border-white"
        />
      </div>
    </section>
  );
};

export default AddTask;

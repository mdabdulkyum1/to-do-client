import { useState } from "react";
import AddTask from "./AddTask/AddTask";


const Home = () => {



  const [tasks, setTasks] = useState([
    { id: "1", title: "Design Homepage", description: "Create wireframe", category: "To-Do" },
    { id: "2", title: "Develop API", description: "Setup endpoints", category: "In Progress" },
    { id: "3", title: "Deploy App", description: "Push to Vercel", category: "Done" },
  ]);

  // Task categories
  const categories = ["To-Do", "In Progress", "Done"];

  return (
    <div className="min-h-screen bg-white dark:bg-blue-950 dark:text-white mt-16 py-16">
      {/* Header Section */}
    
      <AddTask></AddTask>

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 dark:bg-blue-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">{category}</h2>

            {/* Task List */}
            <div className="space-y-3 min-h-[200px]">
              {tasks
                .filter((task) => task.category === category)
                .map((task) => (
                  <div key={task.id} className="bg-white dark:bg-blue-800 p-3 rounded-lg shadow-md cursor-grab">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      </div>
  );
};

export default Home;

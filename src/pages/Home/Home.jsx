import AddTask from "./AddTask/AddTask";
import TaskBoard from "./TaskBoard/TaskBoard";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
    <Helmet>
        <title>Task Management | Home</title>
    </Helmet>
   
    <div className="min-h-screen bg-white dark:bg-blue-950 dark:text-white mt-16 py-16">
      {/* Header Section */}

      <AddTask></AddTask>

      {/* Task Board */}
      <TaskBoard></TaskBoard>
    </div>
    </>
  );
};

export default Home;

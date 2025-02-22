import AddTask from "./AddTask/AddTask";
import TaskBoard from "./TaskBoard/TaskBoard";
import { Title} from 'react-head';

const Home = () => {
  return (
    <>
    <Title>
      Task Manager | Home
    </Title>
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

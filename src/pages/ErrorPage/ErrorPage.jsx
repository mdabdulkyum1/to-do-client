
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text p-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary dark:text-accent">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-bold mt-4">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          The page youre looking for doesnt exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 py-3 px-8 bg-secondary text-white rounded-lg font-semibold shadow-md hover:bg-secondary/90 focus:outline-none focus:ring focus:ring-secondary/50 transition"
        >
          Go Home
        </button>
      </div>
      <div className="mt-10">
        <img
          src="https://i.ibb.co.com/j30fXyH/error.jpg" // Replace with your custom image URL
          alt="Error Illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default ErrorPage;

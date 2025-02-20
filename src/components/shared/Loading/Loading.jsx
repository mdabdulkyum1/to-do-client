
import PropTypes from 'prop-types'

const Loading = ({ message = "Loading..." }) => {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute border-4 border-t-transparent border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          <div className="absolute border-4 border-t-transparent border-green-500 rounded-full w-12 h-12 animate-spin-slow"></div>
        </div>
        {/* Loading Message */}
        <h1 className="mt-6 text-2xl font-semibold text-gray-800">{message || "Loading..."}</h1>
      </div>
    );
  };
  
  Loading.propTypes = {
    message: PropTypes.string.isRequired
  }

  export default Loading;
  


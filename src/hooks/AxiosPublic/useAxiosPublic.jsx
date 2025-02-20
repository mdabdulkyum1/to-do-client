import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://edu-pro-sphere.vercel.app'
  });

  
const useAxiosPublic = () => {
    return axiosInstance;
};

export default useAxiosPublic;
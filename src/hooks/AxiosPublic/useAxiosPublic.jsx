import axios from 'axios'


const axiosInstance = axios.create({
    // baseURL: 'https://to-do-server-production-220c.up.railway.app'
    baseURL: 'https://to-do-server-production-220c.up.railway.app'
  });

  
const useAxiosPublic = () => {
    return axiosInstance;
};

export default useAxiosPublic;
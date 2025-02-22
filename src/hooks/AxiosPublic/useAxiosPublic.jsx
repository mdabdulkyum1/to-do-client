import axios from 'axios'


const axiosInstance = axios.create({
    // baseURL: 'https://to-do-server-dun.vercel.app'
    baseURL: 'https://to-do-server-dun.vercel.app'
  });

  
const useAxiosPublic = () => {
    return axiosInstance;
};

export default useAxiosPublic;
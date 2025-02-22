import axios from 'axios'
import useAuth from '../GetAuthInfo/useAuth';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
    // baseURL: 'https://to-do-server-production-220c.up.railway.app'
    baseURL: 'https://edu-pro-sphere.vercel.app'
  });

  
const useAxiosSecure = () => {
  const {logOut} = useAuth();
  const navigate = useNavigate();

  axiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token');
    config.headers.authorization = token;
    return config;
  }, function (error){
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(function (response){
      return response;
  }, async (error) =>{
    const status = error.response.status;
    if(status === 401 || status === 403){
      await logOut();
      navigate('/login')
    }
    return Promise.reject(error);
  })

    return axiosInstance;
};

export default useAxiosSecure;
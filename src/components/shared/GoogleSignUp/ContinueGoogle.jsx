import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/GetAuthInfo/useAuth";
import useAxiosPublic from "../../../hooks/AxiosPublic/useAxiosPublic";
import { useLocation, useNavigate } from "react-router";

const ContinueGoogle = () => {
  const { googleLogin } = useAuth();
  const location = useLocation();
  const targetPath = location?.state ? `${location.state}` : "/home";

  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const handelGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        };

        if (user?.email) {
          navigate(targetPath);
          const { data } = await axiosPublic.post(`/users`, userInfo);
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate(targetPath);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={handelGoogleLogin}
      className="p-3 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text rounded-full shadow-md hover:bg-light-border dark:hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
    >
      <FaGoogle className="text-primary dark:text-accent" size={24} />
    </button>
  );
};

export default ContinueGoogle;

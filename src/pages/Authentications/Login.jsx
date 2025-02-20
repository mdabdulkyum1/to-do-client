import { FaFacebook, FaGithub } from "react-icons/fa";
import { Helmet } from "react-helmet-async";


import { useForm } from "react-hook-form";
import useAuth from "../../hooks/GetAuthInfo/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { loadCaptchaEnginge, LoadCanvasTemplate } from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router";
import ContinueGoogle from './../../components/shared/GoogleSignUp/ContinueGoogle';
import ThemeToggle from "../../hooks/ThemeToggle/ThemeToggle";

const Login = () => {
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location?.state ? `${location.state}` : "/home";

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const result = await loginUser(email, password);
      if (result?.user) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate(targetPath);
      }
    } catch (error) {
      setErr(error.message);
    }
    // console.log(email, password);
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);



  return (
    <>
      <Helmet>
        <title>Task Management | Login</title>
      </Helmet>
      <div
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="shadow-lg rounded-lg p-8 max-w-4xl w-full flex flex-col md:flex-row">
          {/* Illustration Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
            Login    <ThemeToggle></ThemeToggle>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
              Login
            </h2>
           
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="Type here"
                  className="w-full border border-light-border dark:border-dark-border rounded-lg p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                  required
                />
                {errors.email && (
                  <span className="text-accent dark:text-accent">
                    Email field is required
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Password field is required",
                  })}
                  placeholder="Enter your password"
                  className="w-full border border-light-border dark:border-dark-border rounded-lg p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                />
                {errors.password && (
                  <span className="text-accent dark:text-accent">
                    {errors.password.message}
                  </span>
                )}
                {err && (
                  <span className="text-accent dark:text-accent">{err}</span>
                )}
              </div>

              {/* Captcha Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text"
                  htmlFor="captcha"
                >
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  {...register("captcha", {
                    required: "Captcha field is required",
                  })}
                  placeholder="Enter Captcha"
                  className="w-full border border-light-border dark:border-dark-border rounded-lg p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                />
                {errors.captcha && (
                  <span className="text-accent dark:text-accent">
                    {errors.captcha.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary dark:bg-accent text-white py-2 rounded-lg font-medium hover:bg-accent hover:dark:bg-primary transition-all duration-200"
              >
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-sm text-light-text dark:text-dark-text mt-4 text-center md:text-left">
              Don{"'"}t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary dark:text-accent font-medium"
              >
                Sign Up
              </Link>
            </p>

            {/* Social Media Login */}
            <div className="flex items-center justify-center mt-6">
              <p className="text-sm text-light-text dark:text-dark-text">
                Or login with
              </p>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="p-3 bg-light-background dark:bg-dark-background rounded-full shadow-lg hover:bg-light-border dark:hover:bg-dark-border transition-all">
                <FaFacebook
                  className="text-secondary dark:text-light-background"
                  size={24}
                />
              </button>
              <ContinueGoogle></ContinueGoogle>
              <button className="p-3 bg-light-background dark:bg-dark-background rounded-full shadow-lg hover:bg-light-border dark:hover:bg-dark-border transition-all">
                <FaGithub
                  className="text-gray-800 dark:text-light-background"
                  size={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import { FaFacebook, FaGithub } from "react-icons/fa";
import ContinueGoogle from "../../components/shared/GoogleSignUp/ContinueGoogle";
import { useForm } from "react-hook-form";
import { imageUpload, saveUser } from "../../Api/utils";
import useAuth from "../../hooks/GetAuthInfo/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";
import ThemeToggle from "../../hooks/ThemeToggle/ThemeToggle";
import { Title} from 'react-head';

const SignUp = () => {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location?.state ? `${location.state}` : "/home";

  const onSubmit = async (data) => {
    const { name, email, photo, password } = data;
    const photoFile = photo[0];
    const photoUrl = await imageUpload(photoFile);

    if (loading) {
      Swal.fire({
        title: "Registering User...",
        text: "Please wait while we process the registration.",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photoUrl);
      const dbData = await saveUser(result?.user);

      if (result?.user && dbData.insertedId) {
        setLoading(false);

        Swal.fire({
          title: "Success!",
          text: "User registration completed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(targetPath);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Title>
      Task Manager | Sign Up
    </Title>
      <div>
        <div className="bg-light-background dark:bg-dark-background shadow-lg rounded-lg p-8 max-w-4xl w-full flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-6 text-center md:text-left text-primary dark:text-accent">
              Sign Up    <ThemeToggle></ThemeToggle>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Type here"
                  className="w-full border border-light-border dark:border-dark-border rounded-lg p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                  required
                />
                {errors.name && (
                  <span className="text-accent dark:text-accent">
                    Name field is required
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text"
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

              {/* Photo Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text"
                  htmlFor="photo"
                >
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  {...register("photo", {
                    required: "Choose a Profile Photo!",
                  })}
                  className="file-input w-full max-w-xs border border-light-border dark:border-dark-border rounded-lg bg-primary dark:bg-accent text-light-text dark:text-dark-text px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              {/* Error Messages */}
              {errors.photo && (
                <span className="text-accent dark:text-accent">
                  {errors.photo.message}
                </span>
              )}

              {/* Password Input */}
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-light-text dark:text-dark-text"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Password field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must not exceed 20 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                      message:
                        "Password must contain A-Z a-z letters and numbers",
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full border border-light-border dark:border-dark-border rounded-lg p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                />
                {errors.password && (
                  <span className="text-accent dark:text-accent">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary dark:bg-accent text-white py-2 rounded-lg font-medium hover:bg-accent hover:dark:bg-primary transition-all duration-200"
              >
                Sign Up
              </button>
            </form>

            {/* Login Redirect */}
            <p className="text-sm text-light-text dark:text-dark-text mt-4 text-center md:text-left">
              Already registered?{" "}
              <Link
                to="/"
                className="text-primary dark:text-accent font-medium"
              >
                Go to log in
              </Link>
            </p>

            {/* Social Media Sign Up */}
            <div className="flex items-center justify-center mt-6">
              <p className="text-sm text-light-text dark:text-dark-text">
                Or sign up with
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

          {/* Illustration Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            sign Up
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

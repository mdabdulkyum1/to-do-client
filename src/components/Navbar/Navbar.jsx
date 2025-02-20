import { Link, NavLink, useNavigate } from "react-router-dom";
import useScrollDirection from "../../hooks/ScrollDirection/useScrollDirection";
import useAuth from "../../hooks/GetAuthInfo/useAuth";
import ThemeToggle from "./../../hooks/ThemeToggle/ThemeToggle";
import logo from "../../assets/logo.png";
import darkLogo from "../../assets/darkLogo.png";
import { Tooltip } from "react-tooltip";
import useRole from './../../hooks/GetRole/useRole';

const Navbar = () => {
  const isVisible = useScrollDirection();

  const { user, loading, logOut } = useAuth();
  const {role} = useRole();

  const navigate = useNavigate();
  const handelLogOut = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive
                ? "dark:text-primary border-b-2 border-primary"
                : "text-light-text hover:text-primary dark:text-dark-text dark:hover:text-accent"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-classes"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive
                ? "dark:text-primary border-b-2 border-primary"
                : "text-light-text hover:text-primary dark:text-dark-text dark:hover:text-accent"
            }`
          }
        >
          All Classes
        </NavLink>
      </li>
      {
        role === "student" && <li>
        <NavLink
          to="/tech-on"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive
                ? "dark:text-primary border-b-2 border-primary"
                : "text-light-text hover:text-primary dark:text-dark-text dark:hover:text-accent"
            }`
          }
        >
          Teach on EduProSphere
        </NavLink>
      </li>
      }
      <li>
  <NavLink
    to="/about"
    className={({ isActive }) =>
      `px-4 py-2 rounded ${
        isActive
          ? "dark:text-primary border-b-2 border-primary"
          : "text-light-text hover:text-primary dark:text-dark-text dark:hover:text-accent"
      }`
    }
  >
    About EduManage
  </NavLink>
</li>

    </>
  );

  const dropdownLinks = (
    <>
      <li>
        <NavLink
          to={
            role === "admin" ? "/dashboard" :
            role === "teacher" ? "/dashboard/teacher-home" :
            role === "student" ? "/dashboard/my-enroll-class" :
            "/"
          }
          
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive
                ? "dark:text-primary border-b-2 border-primary"
                : "text-light-text hover:text-primary dark:text-dark-text dark:hover:text-accent"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <nav
      className={`border-b dark:border-b-slate-500 fixed top-0 left-0 z-50 w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text`}
    >
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-light-background dark:bg-dark-background rounded-box z-[1]  mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="hidden sm:flex items-center justify-between">
            <img
              src={darkLogo}
              alt="Light Logo"
              className="w-16 hidden dark:block"
            />
            <img
              src={logo}
              alt="Dark Logo"
              className="w-16 block dark:hidden"
            />

            <Link
              to="/"
              className="text-sm md:xl font-bold text-primary dark:text-accent sm:ml-4"
            >
              EduProSphere
            </Link>
          </div>
          <Link
            to="/"
            className="sm:hidden text-sm md:xl font-bold text-primary dark:text-accent sm:ml-4"
          >
            EduProSphere
          </Link>
        </div>
        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2 px-1 text-light-text dark:text-dark-text">
            {links}
          </ul>
        </div>
        {/* Navbar End */}
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {loading ? (
            <div className="skeleton h-12 w-12 shrink-0 border border-accent rounded-full"></div>
          ) : user ? (
            // <div className="flex items-center gap-2">
            //   <img
            //     src={user?.photoURL}
            //     referrerPolicy="no-referrer"
            //     alt={user?.displayName}
            //     title={user?.displayName}
            //     className="h-12 w-12 rounded-full border border-primary dark:border-accent"
            //   />
            //   <button
            //     className="btn bg-accent text-light-text dark:text-dark-text"
            //     onClick={handelLogOut}
            //   >
            //     LogOut
            //   </button>
            // </div>
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border border- ">
                    <Tooltip id="my-tooltip" className="z-50" place="left" />
                    <img
                      alt={user?.displayName}
                      src={user?.photoURL}
                      referrerPolicy="no-referrer"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={`${user?.displayName}`}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content space-y-3 bg-light-background dark:bg-dark-background border border-transparent dark:border-white rounded-lg z-10 mt-3 p-4 shadow-lg w-64 transition-all duration-300"
                >
                  {/* User Display Name */}
                  <li className="text-center text-lg font-semibold  mb-2">
                    {user?.displayName || "Guest"}
                  </li>

                  {/* Dropdown Links */}
                  <ul className="">{dropdownLinks}</ul>

                  {/* Logout Button */}
                  <li className="mt-2">
                    <button
                      onClick={handelLogOut}
                      className="btn-sm bg-primary text-white rounded-md transition-colors w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <button
                onClick={handelLogOut}
                className="btn-sm bg-primary text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/signup">
                <button className="btn btn-sm border border-primary dark:border-accent rounded-sm text-primary dark:text-accent">
                  SignUp
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-sm border border-primary dark:border-accent rounded-sm text-primary dark:text-accent">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

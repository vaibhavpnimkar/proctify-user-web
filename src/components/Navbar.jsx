import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const regex = /^\/dashboard\/exam\/\d+$/;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     if (location.pathname !== "/register" ||) {
  //       navigate("/");
  //     }
  //     setLogin(false);
  //   } else {
  //     if (location.pathname === "/register" || location.pathname === "/") {
  //       setLogin(true);
  //       navigate("/dashboard");
  //     }
  //   }
  // }, [location.pathname, navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/");
  };

  if (
    !location.pathname.includes("/dashboard/exam/") &&
    !regex.test(location.pathname)
  ) {
    return (
      <nav className="w-full flex justify-between items-center px-5 py-2 bg-slate-50 shadow-lg z-20 sticky h-[10vh]">
        <Link to={"/"}>
          <p className="text-xl font-semibold">User Website</p>
        </Link>
        {login && (
          <button
            className="mr-4 text-black hover:bg-red-100 px-4 py-1 hover:text-red-700 rounded-md transition-all duration-150 ease-out hover:transition-all hover:duration-150 hover:ease-in"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </nav>
    );
  } else {
    return null;
  }
};

export default Navbar;

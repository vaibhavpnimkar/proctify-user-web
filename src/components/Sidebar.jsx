import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const location = useLocation();
  useEffect(() => {
    setActive(location.pathname);
  }, [location]);
  let menuList = [
    {
      id: 1,
      title: "All Exams",
      route: "/dashboard",
    },
    {
      id: 2,
      title: "Give Exams",
      route: "/dashboard/registered-exams",
    },
    {
      id: 3,
      title: "Results",
      route: "/dashboard/results",
    },
    {
      id: 4,
      title: "Report problem",
      route: "/dashboard/report-problem",
    },
    {
      id: 5,
      title: "Profile",
      route: "/dashboard/profile",
    },
    {
      id: 6,
      title: "Password Reset",
      route: "/dashboard/reset-password",
    },
  ];
  return (
    <section className="h-[100vh] w-[20%] bg-blue-950 shadow-xl shadow-blue-600/20 sticky left-0 top-0">
      <ul className="pt-10">
        {menuList.map((item) => {
          return (
            <Link key={item.id} to={item.route}>
              <li
                className={`text-white cursor-pointer pl-4 py-3 ${
                  active === item.route
                    ? "bg-blue-900/30"
                    : "hover:bg-blue-900/30"
                }  transition_fade rounded-lg mx-2 my-2`}
              >
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;

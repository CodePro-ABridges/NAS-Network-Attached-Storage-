import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../../../redux/actionCreators/authActionCreator.js";

const NavBar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    dispatch(signOutUser());
    navigate("/login");
  };

  const menus = [
    isAuthenticated && {
      name: "NAS Dashboard",
      link: "/dashboard",
      icon: MdOutlineDashboard,
    },
    !isAuthenticated && { name: "Login", link: "/login", icon: AiOutlineUser },
    !isAuthenticated && {
      name: "Register",
      link: "/register",
      icon: FiMessageSquare,
    },
    isAuthenticated && {
      name: "Analytics",
      link: "/",
      icon: TbReportAnalytics,
    },
    isAuthenticated && { name: "File Manager", link: "/", icon: FiFolder },
    isAuthenticated && { name: "Cart", link: "/", icon: FiShoppingCart },
    isAuthenticated && {
      name: "Saved",
      link: "/",
      icon: AiOutlineHeart,
    },
    isAuthenticated && {
      action: handleLogout,
      name: "Logout",
      icon: RiSettings4Line,
    },
  ].filter(Boolean);

  return (
    <section className={`flex ${open ? "w-72" : "w-16"} duration-500`}>
      <div className="bg-[#0e0e0e] min-h-screen w-72 duration-500 text-gray-100 px-4">
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {menus.map((menu, i) =>
            menu.action ? (
              <button
                key={i}
                onClick={menu.action}
                className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              >
                {React.createElement(menu.icon, { size: 20 })}
                {open && <span className="whitespace-pre">{menu.name}</span>}
              </button>
            ) : (
              <Link
                to={menu.link || "#"}
                key={i}
                className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              >
                {React.createElement(menu.icon, { size: 20 })}
                {open && <span className="whitespace-pre">{menu.name}</span>}
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default NavBar;

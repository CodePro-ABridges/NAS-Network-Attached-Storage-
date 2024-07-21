import React from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../store/hooks.ts";
import Navbar from "../NavComponent/NavBar.tsx";

//Interface
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  //redux
  const isOpen = useAppSelector((state) => state.navbar.isOpen);

  //Variants
  const contentVariants = {
    open: { marginLeft: "16rem", transition: { duration: 0.3 } },
    closed: { marginLeft: "0", transition: { duration: 0.3 } },
  };

  return (
    <div className="flex">
      <Navbar />
      <motion.main
        className="flex-1 p-5"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={contentVariants}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;

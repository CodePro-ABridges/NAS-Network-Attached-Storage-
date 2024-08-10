import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home: React.FC = () => {
  //
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
  });

  //
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  //
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to The File Management System
        </h1>
        <p className="mt-5 text-xl text-gray-500">
          Efficiently organize, store, and access your files anywhere, anytime.
        </p>
        {}
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Us
        </h2>
        <p className="mt-5 text-xl text-gray-500">
          Our file management system is designed to simpllify your digital life.
          We provide a secure, user-friendly platform for storing, organizing,
          and sharing your important documents and files. With our system, you
          can say goodbye to cluttered desktops and lost files.
        </p>
      </motion.section>
      {}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Why Choose Our File Management System?
        </h2>
        <ul className="mt-5 text-xl text-gray-500 list-disc list-inside space-y-3">
          <li>Secure cloud storage with end-to-end encryption</li>
          <li>Easy file sharing and collaboration features</li>
          <li>Automatic file versioning and backup</li>
          <li>Seamless integration with popular productivity tools</li>
          <li>User-friendly interface for effortless file organization</li>
          <li>Access your files from any device, anywhere in the world !</li>
        </ul>
      </motion.section>
    </div>
  );
};

export default Home;

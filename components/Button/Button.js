import React from "react";
import { motion } from "framer-motion";

export default function Button() {
  return (
    <>
      <motion.button
        initial={{ opacity: 0.6 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        whileInView={{ opacity: 1 }}
        className="bg-slate-700 rounded-[15px] px-4 py-2 w-20 h-10 items-center flex flex-col"
      >
        Button
      </motion.button>
    </>
  );
};

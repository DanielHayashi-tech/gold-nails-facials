import React from "react";
import { Great_Vibes } from "next/font/google";

const greatVibe = Great_Vibes({
  weight: ["400", "400"],
  subsets: ["latin"],
});

export default function Headings(props) {
  
  return (
<<<<<<< HEAD
    <div
      className={`text-[55px] font-bold flex items-center gap-4 py-10 ${greatVibe.className}`}
    >
=======
    <div className={`text-[40px] font-bold flex items-center gap-4 py-10 ${lobsterTwo.className}`}>
>>>>>>> f9b76eef6d0c3589de3c15d20e7bec03a4b0a370
      {props.title}
    </div>
  );
};

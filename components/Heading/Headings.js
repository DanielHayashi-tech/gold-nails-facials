import React from "react";
import { Great_Vibes } from "next/font/google";

const greatVibe = Great_Vibes({
  weight: ["400", "400"],
  subsets: ["latin"],
});

export default function Headings(props) {
  
  return (
    <div className={`text-[55px] font-bold flex items-center gap-4 py-10 ${greatVibe.className}`}>
      {props.title}
    </div>
  );
};

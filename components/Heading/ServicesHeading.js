import React from "react";
import { Lobster_Two } from "next/font/google";

const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function ServicesHeadings(props) {
  
  return (
    <div className={`text-[40px] font-bold flex justify-center items-center gap-10 py-10 ${lobsterTwo.className}`}>
      {props.title}
    </div>
  );
};

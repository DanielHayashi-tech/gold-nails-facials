import React from "react";
import { Lobster_Two } from "next/font/google";
import TypeWriter from "typewriter-effect";
import { Link } from "react-scroll";

const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Hero(props) {
  return (
    <>
      <div
        id="hero"
        className="bg-[url(/hero.jpg)] flex items-center h-screen bg-fixed bg-center bg-cover "
      >
        <div className="container flex items-center h-screen px-4 mx-auto bg-fixed bg-center bg-cover">
          <div className="max-w-[450ox] text-white flex flex-col gap-[40px]">
            <div>
              <h1
                className={`text-7xl pt-10 transition duration-500 pb-8 ${lobsterTwo.className}`}
              >
                {props.title}
              </h1>
              <div className="bg-[#41ffd6] h-[2px] w-[40px]"></div>
              <h4 className="mt-10 text-5xl text-white">
                <TypeWriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Welcome Back!")
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString("We're a nail salon")
                      .pauseFor(2000)
                      .deleteChars(12)
                      .typeString("the people's salon")
                      .pauseFor(2500)
                      .start();
                  }}
                  options={{
                    autoStart: true,
                    loop: true,
                    changeDelay: 3,
                    changeDeletedSpeed: 2,
                  }}
                />
              </h4>
            </div>

            <div>
              <Link to="contact">
                <button className="uppercase">
                  <span className="transition duration-700 btn">Book Now!</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
import React from "react";
import { Lobster_Two } from "next/font/google";
import TypeWriter from "typewriter-effect";
import { Link } from "react-scroll";
import { useRouter } from 'next/router';


const lobsterTwo = Lobster_Two({
  weight: ["400", "700"],
  subsets: ["latin"],
});



export default function Hero(props) {

  const router = useRouter();
  function servicesButton() {
    router.push('/services')
  }

  return (
    <>
      <div id="pink" className="bg-[url(/nail-tech-a.jpeg)] flex items-center h-screen bg-fixed bg-center bg-cover">
        <div className="container flex items-center h-screen px-4 mx-auto bg-fixed bg-center bg-cover">
          <div className="max-w-[450ox] text-white flex flex-col gap-[40px]">
            <div>
              <h1
                className={`text-8xl pb-20 transition duration-500 pb-8 ${lobsterTwo.className}`}
              >
                {props.title}
              </h1>
              
              <h4 className="pb-20 text-5xl text-white">
                <TypeWriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Welcome Back !")
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
            <div className="transition duration-150 ease-out hover:ease-in">
            
            <button className="btn" onClick={() => servicesButton()}>
                Book Now!
                </button>
            </div>   
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
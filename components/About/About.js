import React from "react";
import Headings from "../Heading/Headings";
import { BsClock } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { GiClick } from "react-icons/gi";


const About = (props) => {
  return (

    <section id="about" className="container px-4 py-5 mx-auto ">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <Headings title="About Us" />
          <div> {props.desc} </div>
        </div>

        <div className="...">
          <h2 className="flex items-center pb-4 text-xl font-bold pt-9">
            <IoLocationOutline className="mr-5 text-4xl" />
            Location
          </h2>

          <a href="https://goo.gl/maps/5t19,VM9HLzZsSkZV8" className="hover:underline">
            <p>1634 S Mason Rd, Katy, TX, 77450</p>
          </a>
          <br></br>
          <div className="flex items-center pb-4 text-xl font-bold pt-9">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.707734413577!2d-95.75496478457062!3d29.757170581987683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864127357810226b%3A0xf7f62ead58fea018!2sGolden%20Nails%20N%20Facial!5e0!3m2!1sen!2sus!4v1680297800133!5m2!1sen!2sus"
              width="400"
              height="250"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

        </div>

        <div className="text-center pl-10">
          <div className="text-center pl-10">  
          <h2 className="flex items-center pb-4 pr-4 text-xl font-bold pt-9">
            <BsClock className="pr-2 text-4xl" />
            Hours of Operation
          </h2>
          <div className="flex items-center justify-between w-[200px]">
            <div className="basis-1/4 flex flex-col gap-6  text-gray-30">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day, index) => (
                  <div className="flex items-center gap-4 font-medium" key={index}>
                    {day}
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-6 text-gray-30">
              {[":", ":", ":", ":", ":", ":", ":"].map((separator, index) => (
                <div key={index}>{separator}</div>
              ))}
            </div>
            <div className="flex flex-col gap-6 text-white-60">
              {["9am - 7pm", "9am - 7pm", "9am - 7pm", "9am - 7pm", "9am - 7pm", "9am - 6pm", "10am - 5pm"].map(
                (time, index) => (
                  <div key={index}>{time}</div>
                )
              )}
            </div>
          </div>
        </div>

        </div>

        <div className="...">
          <h2 className="flex items-center pb-4 text-xl font-bold pt-9">
            <BsTelephone className="mr-5 text-4xl" />
            Phone Number
          </h2>
          <p className="text-xl font-bold hover:text-blue-800">
                    <a href="tel:2813927003">(281) 392-7003</a>

          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

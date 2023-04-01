import React from "react";
import Headings from "../Heading/Headings";
import { BsClock } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { GiClick } from "react-icons/gi";

const About = (props) => {
  return (
    <section id="about" className="container px-4 py-10 mx-auto">
      <Headings title="About Us" />
      <div className="grid tracking-tight grid-cols-1 md:grid-cols-2 gap-[60px]">
        <div className="">
          <div>
            <p>{props.desc}</p>
          </div>
          <h2 className="flex items-center pb-4 text-xl font-bold pt-9">
            <IoLocationOutline className="mr-5 text-2xl" />
            Location
          </h2>
          <a href="https://goo.gl/maps/5t19VM9HLzZsSkZV8" className="hover:underline">
            <p>1634 S Mason Rd</p>
            <p>Katy, TX 77450</p>
          </a>
    
          <br></br>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.707734413577!2d-95.75496478457062!3d29.757170581987683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864127357810226b%3A0xf7f62ead58fea018!2sGolden%20Nails%20N%20Facial!5e0!3m2!1sen!2sus!4v1680297800133!5m2!1sen!2sus"
          width="400"
          height="250"
          style= {{ border: "0"}}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
          </iframe>

          
        </div>

        <div>
          <h2 className="flex items-center pb-5 text-xl font-bold">
            <BsClock className="mr-5 text-2xl" />
            Hours of Operation
          </h2>
          <div className="flex items-center justify-between w-[350px]">
            <div className="flex flex-col gap-6">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day, index) => (
                  <div className="flex items-center gap-4 font-medium" key={index}>
                    {day}
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-6 text-gray-600">
              {[":", ":", ":", ":", ":"].map((separator, index) => (
                <div key={index}>{separator}</div>
              ))}
            </div>
            <div className="flex flex-col gap-6 text-gray-600">
              {["9am - 7pm", "9am - 7pm", "9am - 7pm", "9am - 7pm", "9am - 7pm", "9am - 6pm", "10am - 5pm"].map(
                (time, index) => (
                  <div key={index}>{time}</div>
                )
              )}
            </div>
          </div>
          <div className="max-w-[800px]">
            <h2 className="mt-16 mb-10 font-bold">{props.title}</h2>
            <p className="text-gray-600">{props.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

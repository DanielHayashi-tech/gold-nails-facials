import offers from "../../pages/api/offers";
import Headings from "../Heading/Headings";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";


export default function Service() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <section id="service" className="container px-4 py-10 mx-auto">
      <Headings title="Our Services" />
      <div className="grid md:grid-cols-3 gap-[70px] ">
        {/* test */}
        {offers.map((offer) => (
          <motion.div
            transition={{ layout: { duration: 1, type: "spring" } }}
            layout
            onClick={handleClick}
            style={{
              borderRadius: "1rem",
              boxShadow: "0px 10px 30px rgba(201, 199, 199, 0.9)",
              width: "200px",
            }}
            key={offer.id}
            className="flex flex-col items-center gap-2 "
          >
            <Image alt="nails-service-dash" src={offer.img} className="w-[100%]" />
            <motion.h2 className="items-center px-4 py-3 text-xl font-bold">
              {offer.title}
            </motion.h2>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <span className="flex items-center justify-center text-xs text-teal-600 ">
                  {offer.price}
                </span>
                <p className="px-4 py-3 text-sm tracking-tight">{offer.desc}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

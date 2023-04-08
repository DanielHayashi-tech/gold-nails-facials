import pediOffers from "@/pages/api/pediOffers";
import ServicesHeadings from "../Heading/ServicesHeading";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { PrismaClient } from '@prisma/client'


export default function PedicureService({prices}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <section id="pedicureservice" className="container px-4 py-10 mx-auto">
      <ServicesHeadings title="Our Pedicure Services"  />
      <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-3 md:grid-cols-4 gap-[30px] ">
    
        {prices.map((offer) => (
          <motion.div
            transition={{ layout: { duration: 1, type: "spring" } }}
            layout
            onClick={handleClick}
            style={{
              borderRadius: "1rem",
              boxShadow: "0px 10px 30px rgba(252, 106, 135, 0.2)",
              width: "200px",
            }}
            key={offer.ServiceID}
            className="flex flex-col items-center gap-2 "
          >
            {/* <Image alt="nails-pedicureservice" src={prices.img} className="w-[100%]" /> */}
            <motion.h2 className="items-center px-4 py-3 text-xl font-bold">
              {offer.service_title}
            </motion.h2>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <span className="flex items-center justify-center text-xs text-teal-600 "> 
                  ${offer.service_price}.00
                </span>
                <p className="px-4 py-3 text-sm tracking-tight">{offer.service_description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
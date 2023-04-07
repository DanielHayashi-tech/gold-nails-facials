import manicureOffers from "../../pages/api/manicureOffers";
import ServicesHeadings from "../Heading/ServicesHeading";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from '../../context/AuthContext.js';
import { Button } from 'react-bootstrap';
import { PrismaClient } from '@prisma/client'
import { data } from "autoprefixer";
import { getToken } from "@chakra-ui/react";



export default function ManicureService({posts}) {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, getToken } = useAuth();
  console.log(posts)

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function getToCart(item) {
    cart.push(item)
  }

  return (
    <section id="ManicureService" className="container px-5 py-5 mx-auto">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-1 ..."> .</div>
       </div>
      <ServicesHeadings title="Our Manicure Services"/>
      <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-3 md:grid-cols-4 gap-[30px] ">
        
        {posts && posts.map((offer) => (
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
            {/* <Image alt="nails-manicureservice" src={offer} className="w-[100%]" /> */}
            <motion.h2 className="items-center px-4 py-3 text-xl font-bold">
              {offer.service_title}
            </motion.h2>
            {isOpen && (
              <motion.div
                initial={{ opacity: 10 }}
                animate={{ opacity: 10 }}
                transition={{ duration: 1.2 }}
              >
                <span className="flex items-center justify-center text-xs text-teal-600 ">
                  {offer.service_price}
                </span>
                <p className="px-4 py-3 text-sm tracking-tight">{offer.service_description}</p>
                <button className="btn" onClick={() => getToCart(offer.ServiceID)}>
                Add To Order
                </button>
                </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>

  );
}
export async function getStaticProps() {
  const prisma = new PrismaClient()

// const price_data = await getPrices(await getToken())
const posts = await prisma.service.findMany({
  select: {
    ServiceID: true,
    service_price: true,
    service_description: true,
    service_title: true
  },
  where: {
    service_typeID: 2,
  },
})

return { props: { posts } }
}



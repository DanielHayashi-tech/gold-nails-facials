import { IoHome } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { BsPatchExclamationFill } from "react-icons/bs";

// Working on mimicking ingelosi the way it links

export const links = [
  {
    name: "Manicures",
    to: "ManicureService",
    id: 1,
    icon: <BsPatchExclamationFill className="mr-3" />,
    href: "/ManicureService",
  },
  {
    name: "Pedicures",
    to: "PedicureService",
    id: 2,
    icon: <BsHandbagFill className="mr-3" />,
    href: "/PedicureService",
  },
  {
    name: "Facials",
    to: "contact",
    id: 3,
    icon: <FaEnvelope className="mr-3" />,
    href: "/quote",
  },
  {
    name: "Additional Packages",
    to: "#",
    id: 4,
    icon: <FaEnvelope className="mr-3" />,
    href: "/#",
  },
];

import { IoHome } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { BsPatchExclamationFill } from "react-icons/bs";

// Working on mimicking ingelosi the way it links

export const links = [
  {
    name: "Dashboard",
    to: "dashboard",
    id: 1,
    icon: <IoHome className="mr-3" />,
    href: "/dashboard",
  },
  {
    name: "About",
    to: "about",
    id: 2,
    icon: <BsPatchExclamationFill className="mr-3" />,
    href: "/about",
  },
  {
    name: "Service",
    to: "service",
    id: 3,
    icon: <BsHandbagFill className="mr-3" />,
    href: "/service",
  },
  {
    name: "Quote",
    to: "quote",
    id: 4,
    icon: <FaEnvelope className="mr-3" />,
    href: "/quote",
  },
];

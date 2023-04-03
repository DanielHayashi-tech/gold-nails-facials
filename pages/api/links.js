import { IoHome } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { BsPatchExclamationFill } from "react-icons/bs";


export const links = [
  {
    name: "About",
    to: "about",
    id: 1,
    icon: <BsPatchExclamationFill className="mr-3" />,
    href: "/about",
  },
  {
    name: "Service",
    to: "service",
    id: 2,
    icon: <BsHandbagFill className="mr-3" />,
    href: "/service",
  },
  {
    name: "Quote",
    to: "contact",
    id: 3,
    icon: <FaEnvelope className="mr-3" />,
    href: "/quote",
  },
];

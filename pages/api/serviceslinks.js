import { IoHome } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { BsPatchExclamationFill } from "react-icons/bs";


export const serviceslinks = [
  {
    name: "Manicures",
    to: "ManicureService",
    id: 7,
    icon: <BsPatchExclamationFill className="mr-3" />,
    href: "/MenuServices/ManicureService",
  },
  {
    name: "Pedicures",
    to: "pedicureservice",
    id: 14,
    icon: <BsHandbagFill className="mr-3" />,
    href: "/MenuServices/PedicureService"
  }
];

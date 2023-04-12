import { IoHome } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { BsHandbagFill } from "react-icons/bs";
import { BsPatchExclamationFill } from "react-icons/bs";
import { BsCartFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const serviceslinks = [
  {
    name: "Manicures",
    to: "ManicureService",
    id: 7,
    icon: <BsPatchExclamationFill className="mr-4" />,
    href: "/MenuServices/ManicureService",
  },
  {
    name: "Pedicures",
    to: "pedicureservice",
    id: 14,
    icon: <BsHandbagFill className="mr-4" />,
    href: "/MenuServices/PedicureService"
  },
  {
    name: "Waxing",
    to: "waxingservice",
    id: 21,
    icon: <BsHandbagFill className="mr-4" />,
    href: "/MenuServices/WaxingService"
  },
  {
    name: "Facial",
    to: "facialservice",
    id: 28,
    icon: <BsHandbagFill className="mr-4" />,
    href: "/MenuServices/FacialService"
  },
  {
    name: "Powder",
    to: "powdernailsservice",
    id: 29,
    icon: <BsHandbagFill className="mr-4" />,
    href: "/MenuServices/PowderNailsService"
  },
  {
    name: "Packages",
    to: "packageservice",
    id: 30,
    icon: <BsHandbagFill className="mr-4" />,
    href: "/MenuServices/PackageService"
  },
  {
    name: "Additional Services",
    to: "additionalservice",
    id: 31,
    icon: <BsHandbagFill className="mr-4" />,
    href: "/MenuServices/AdditionalService"
  }
  
];

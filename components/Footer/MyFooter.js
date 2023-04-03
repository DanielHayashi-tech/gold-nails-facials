import { CgCopyright } from "react-icons/cg";
import Image from "next/image";

export default function MyFooter(props) {
  return (
    <div className="bg-[url(/footer.jpg)] bg-cover bg-center h-[200px]  text-white grid place-items-center">
      <div className="text-center text-xl backdrop-blur-md backdrop-brightness-50">
        <p>Maintained by Mindful Solutions</p>
        <p className="flex items-center">
          <CgCopyright className="mr-1" /> {props.date} {props.rights}
        </p>
        </div>
    </div>
  );
}

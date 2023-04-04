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

     <div className="items-center text-xl backdrop-blur-md backdrop-brightness-50">
     <p>Write us a Review!</p>
     </div>
     <div className="grid grid-cols-2 gap-3 content-normal" >

       <a href="https://www.yelp.com/biz/golden-nails-n-facial-katy">
         <Image alt="footer" src="/yelp2.png" width={35} height={35} />
       </a>
       <a href="https://www.google.com/search?q=golden+nails+n+facial&rlz=1C1UEAD_enUS1018US1019&oq=go&aqs=chrome.1.69i59l3j46i131i199i433i465i512j69i59j69i60l3.1911j0j9&sourceid=chrome&ie=UTF-8#lrd=0x864127357810226b:0xf7f62ead58fea018,1">
         <Image alt="googleImg" src="/google.png" width={35} height={35} />
       </a>
     </div>
     </div>
  );
}

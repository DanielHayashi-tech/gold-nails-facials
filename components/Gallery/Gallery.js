
import React from "react";
import Headings from "../Heading/Headings";
import Image from "next/image";


const Gallery = (props) => {
  return (

    <section id="gallery" className="container px-4 py-5 mx-auto ">
    <Headings title="Our Gallery" />
      <div className="grid grid-cols-3 gap-3">
        <div> <Image alt="galleryimg" src="/gallery8.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery1.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery6.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery5.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery2.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery9.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery4.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery3.png" width={250} height={250}/></div>

         <div><Image alt="galleryimg" src="/gallery7.png" width={250} height={250}/></div>

        </div>
    </section>
  );
};

export default Gallery;

"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../app/globals.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const slides = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Next.js Carousel",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "ShadCN UI",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Embla Carousel",
  },
];

export default function HomeCarousel() {
  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* <Carousel orientation="vertical " className="relative"> */}
      <Carousel  className="relative">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h2 className="text-white text-3xl font-bold">
                    {slide.title}
                  </h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Visible Previous Button */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70">
          <ChevronLeft className="w-6 h-6 text-white" />
        </CarouselPrevious>

        {/* Visible Next Button */}
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70">
          <ChevronRight className="w-6 h-6 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}







//auto play


// "use client";

// import * as React from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";
// import "../../app/globals.css";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../../components/ui/carousel";

// const slides = [
//   {
//     id: 1,
//     image:
//       "https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg",
//     title: "Next.js Carousel",
//   },
//   {
//     id: 2,
//     image:
//       "https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg",
//     title: "ShadCN UI",
//   },
//   {
//     id: 3,
//     image:
//       "https://images.pexels.com/photos/30889575/pexels-photo-30889575/free-photo-of-elegant-orange-sports-car-on-scenic-road.jpeg",
//     title: "Embla Carousel",
//   },
// ];

// export default function HomeCarousel() {
//   const autoplay = React.useRef(
//     Autoplay({ delay: 3000, stopOnInteraction: false })
//   );

//   return (
//     <div className="w-full max-w-5xl mx-auto relative">
//       <Carousel
//         className="relative"
//         plugins={[autoplay.current]}
//         onMouseEnter={autoplay.current.stop}
//         onMouseLeave={autoplay.current.reset}
//       >
//         <CarouselContent>
//           {slides.map((slide) => (
//             <CarouselItem key={slide.id}>
//               <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
//                 <Image
//                   src={slide.image}
//                   alt={slide.title}
//                   fill
//                   className="object-cover"
//                 />

//                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                   <h2 className="text-white text-3xl font-bold">
//                     {slide.title}
//                   </h2>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Previous */}
//         <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70">
//           <ChevronLeft className="w-6 h-6 text-white" />
//         </CarouselPrevious>

//         {/* Next */}
//         <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70">
//           <ChevronRight className="w-6 h-6 text-white" />
//         </CarouselNext>
//       </Carousel>
//     </div>
//   );
// }

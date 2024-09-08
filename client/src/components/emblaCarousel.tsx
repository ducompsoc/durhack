"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import "@/styles/emblaCarousel.css";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  const images = [
    {
      src: "/assets/graphics/guilds/pegasus/icon.svg",
      alt: "Pegasus Icon",
    },
    {
      src: "/assets/graphics/guilds/cygnus/icon.svg",
      alt: "Cygnus Icon",
    },
    {
      src: "/assets/graphics/guilds/lyra/icon.svg",
      alt: "Lyra Icon",
    },
    {
      src: "/assets/graphics/guilds/orion/icon.svg",
      alt: "Orion Icon",
    },
  ];

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container w-1/5">
        {images.map((image, index) => (
          <div className="embla__slide " key={index}>
            <img
              className="w-full h-auto mx-auto shadow-md"
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './emblaCarouselArrowButtons';
import "@/styles/emblaCarousel.css";

type PropType = {
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

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

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla border-4 content-center" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex items-center">
          {images.map((image, index) => (
            <div className="embla__slide w-2/6" key={index}>
              <img
                src={image.src}
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

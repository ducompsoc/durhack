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
    <section className="max-w-4xl mx-auto" dir="rtl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex items-center flex-col mt-[-1rem] h-[calc(1rem+19rem)]">
          {images.map((image, index) => (
            <div className="relative w-full h-[300px] py-30">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-7">
        <div className="flex gap-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

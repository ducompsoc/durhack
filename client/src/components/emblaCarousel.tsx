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
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type PropType = {
  options?: Partial<EmblaOptionsType>;
};

export const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options as Partial<EmblaOptionsType> | any, [Autoplay()]);

  const images: { src: string; alt: string }[] = [
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

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    const autoplay = emblaApi?.plugins()?.autoplay as any;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options?.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi as any, onNavButtonClick);

  return (
    <section className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex items-center">
          {images.map((image, index) => (
            <div className="relative w-[530px] p-4 " key={index}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                />
              </AspectRatio>
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

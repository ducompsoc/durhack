import { EmblaCarousel } from "./emblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { axis: "y", direction: "rtl", loop: true };

export default function Gallery() {

  return (
    <div className="w-screen text-center mx-auto px-16">

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold">
        <span>Gallery</span>
      </h1>

      <div className="w-1/5 h-0.5 mx-auto bg-gradient-to-r from-transparent via-white to-transparent my-2"></div>

      <div className="text-center text-center text-lg sm:text-lg md:text-xl lg:text-xl px-4 sm:px-8 md:px-12 lg:px-24">
        Word Word Word Word Word Word Word Word Word Word Word Word  Word Word Word Word  Word Word Word Word
        Word Word Word Word  Word Word Word Word Word Word Word Word Word Word Word Word
        <br />
        <br />
        Word but cool this time
        <br />
        &nbsp;
      </div>

      <div className=" flex item-start">
        <EmblaCarousel options={OPTIONS} />
      </div>
    </div>
  )
}

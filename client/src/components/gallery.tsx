import { EmblaCarousel } from "./emblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { axis: "y", direction: "rtl", loop: true };

export default function Gallery() {
    
  return (
    <div className="w-screen text-center">
        <h1 className="text-3xl font-bold">
            <span>Gallary</span>
        </h1>

        <div className="w-1/5 h-0.5 mx-auto bg-gradient-to-r from-transparent via-white to-transparent my-2"></div>
        
        <div className="text-center text-lg text-xl p-4">
                Word Word Word Word Word Word Word Word Word Word Word Word  Word Word Word Word  Word Word Word Word 
                Word Word Word Word  Word Word Word Word Word Word Word Word Word Word Word Word 
                <br/>
                <br/>
                Word but cool this time
                <br/>
                &nbsp;
            </div>

        
            <div className=" flex item-start">
              <EmblaCarousel options={OPTIONS} />
            </div>
        
    </div>
  
  )
}

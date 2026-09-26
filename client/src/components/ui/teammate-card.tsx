import React from "react";
import {cn} from "@/lib/utils";
import {type Teammate} from "@/config/teammates";
import Image from "next/image"

type CardProps = Teammate & React.ComponentProps<"button">

export function TeammateCard({
                flipped,
                imgSrc,
                teammateName,
                teamPosition,
                funFact,
                quote,
                quoteSource,
                className,
                ...props
              }: { flipped: boolean } & CardProps) {
  return (
    <button
      type="button"
      className={cn("w-60 h-84 shadow-md transition-all duration-200 hover:shadow-2xl perspective-[100rem]", className)}
      {...props}
    >
      <div
        className={cn(
          "relative size-full transition duration-500 transform-3d",
          flipped && "transform-[rotateY(180deg)]",
        )}
      >
        <div className="absolute inset-0 size-full backface-hidden">
          <div className="flex h-full w-full flex-col items-center justify-center bg-white text-black">
            <div className="flex flex-col w-50">
              <div className="relative h-58 w-full">
                <Image className="w-full object-cover" fill alt="someone" loading="lazy" src={imgSrc} />
              </div>
              <div className="relative flex flex-col text-left text-md">
                <h1>{teammateName}</h1>
                <h3>{teamPosition}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 size-full backface-hidden transform-[rotateY(180deg)]">
          <div className="flex h-full w-full flex-col items-center justify-center bg-white text-black box-border p-8">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Something about me</p>
              <p className="text-sm text-gray-700 leading-relaxed">{funFact}</p>
            </div>

            <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-900">“{quote}”</p>
              <p className="text-xs text-right font-medium text-gray-500">— {quoteSource ?? "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}


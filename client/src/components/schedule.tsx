"use client";

import React from "react";
import { audiowide, spaceGrotesk } from "@/lib/google-fonts";
import { cn } from "@/lib/utils";

type EventItem = { title: string; time: string; icon?: React.ReactNode };

/* need to fix only works for odd number rows of events  */
const events: EventItem[] = [
  {
    title: "Registration",
    time: "09:30",
    icon: <img src="/schedule/icon-paper.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Opening talk begins",
    time: "09:30",
    icon: <img src="/schedule/icon-mic.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Optional team building",
    time: "09:30",
    icon: <img src="/schedule/icon-puzzle.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Hacking begins",
    time: "09:30",
    icon: <img src="/schedule/icon-code.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Lunch",
    time: "12:00",
    icon: <img src="/schedule/icon-dish.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Workshop",
    time: "13:00",
    icon: <img src="/schedule/icon-bulb.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Workshop",
    time: "14:00",
    icon: <img src="/schedule/icon-bulb.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Workshop",
    time: "15:00",
    icon: <img src="/schedule/icon-bulb.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Midnight pizza",
    time: "00:00",
    icon: <img src="/schedule/icon-pizza.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Relaxation Room opens",
    time: "00:00",
    icon: <img src="/schedule/icon-moon.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Mario Kart",
    time: "00:00",
    icon: <img src="/schedule/icon-mario.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Cup Stacking",
    time: "00:00",
    icon: <img src="/schedule/icon-cup.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Slideshow Karaoke",
    time: "00:00",
    icon: <img src="/schedule/icon-karoake.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Dinner",
    time: "18:00",
    icon: <img src="/schedule/icon-dish.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Workshop",
    time: "19:00",
    icon: <img src="/schedule/icon-bulb.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Event",
    time: "20:00",
    icon: <img src="/schedule/icon-plant.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Breakfast",
    time: "08:00",
    icon: <img src="/schedule/icon-dish.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Submission Deadline",
    time: "10:00",
    icon: <img src="/schedule/icon-calendar.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Hacking ends",
    time: "11:00",
    icon: <img src="/schedule/icon-code.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Lunch",
    time: "12:30",
    icon: <img src="/schedule/icon-dish.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Science Fair",
    time: "13:30",
    icon: <img src="/schedule/icon-science.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Finalist Presentations",
    time: "15:00",
    icon: <img src="/schedule/icon-mic.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Award Ceremony",
    time: "16:00",
    icon: <img src="/schedule/icon-medal.svg" alt="" className="h-8 w-8" />,
  },
  {
    title: "Finish!",
    time: "17:00",
    icon: <img src="/schedule/icon-flag.svg" alt="" className="h-8 w-8" />,
  },
];


function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
}

export function Schedule(props: React.HTMLAttributes<HTMLDivElement>) {
  const eventRows = chunk(events, 8); // max 8 events per row
  const [showAllMobile, setShowAllMobile] = React.useState(false);
  const mobileEvents = showAllMobile ? events : events.slice(0, 8);

  return (
    <div className="schedule relative flex flex-col items-center justify-center px-4">
      <h1
        className={cn(
          audiowide.className,
          "text-white uppercase mt-44 mb-16 lg:text-5xl md:text-3xl text-2xl text-center font-normal",
        )}
      >
        Schedule
      </h1>

      {/* Small */}
      <div className="relative w-[92%] max-w-md mx-auto min-[1270px]:hidden">
        {/* Vertical rail */}
        <div className="absolute left-0 top-0 bottom-16 w-[3px] bg-[#BCF7EF] rounded-full shadow-[0_0_12px_2px_rgba(199,249,255,0.8)] pointer-events-none z-20" />

        <ul id="schedule-mobile-list" className="relative flex flex-col gap-8">
          {mobileEvents.map((ev, i) => (
            <li key={i} className="relative flex items-start py-2">
              {/* tick */}
              <div className="absolute left-0 top-6 h-[2px] w-4 bg-[#BCF7EF] rounded-r-full z-10" />
              {/* Icon + time */}
              <div className="ml-6 flex flex-col items-center">
                {ev.icon}
                <span className={cn(audiowide.className, "text-white mt-2 text-xs" )}>{ev.time}</span>
              </div>
              {/* titel */}
              <div
                className={cn(
                  spaceGrotesk.className,
                  "ml-6 text-white text-base pt-1 whitespace-pre-line",
                )}
              >
                {ev.title}
              </div>
            </li>
          ))}
        </ul>


        {/* read more button */}
        {events.length > 8 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllMobile((v) => !v)}
              className={cn(
                spaceGrotesk.className,
                "inline-flex items-center gap-2 text-white px-4 py-2 active:scale-[0.92] transition",
              )}
              aria-expanded={showAllMobile}
              aria-controls="schedule-mobile-list"
            >
              {showAllMobile ? "Read Less" : "Read More"}
              <svg
                className={cn(
                  "h-4 w-4 transition-transform",
                  showAllMobile ? "rotate-180" : "rotate-0",
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >

                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.136l3.71-3.906a.75.75 0 111.08 1.04l-4.24 4.47a.75.75 0 01-1.08 0l-4.24-4.47a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Large*/}
      <div
        {...props}
        className="hidden min-[1270px]:block w-[70%] mx-auto space-y-20 py-16"
      >
        {eventRows.map((row, rowIndex) => {
          const isReversed = rowIndex % 2 === 1; // every other row reversed
          const displayRow = isReversed ? [...row].reverse() : row;

          return (
            <div key={rowIndex} className="relative">
              {/* events in 8 cols */}
              <div className="grid grid-cols-8 gap-10 text-center ">
                {displayRow.map((ev, i) => (
                  <div key={i} className="flex flex-col items-center pb-12">
                    <span
                      className={cn(
                        spaceGrotesk.className,
                        "text-white mb-3 text-base text-center h-[3.5rem] flex items-center justify-center whitespace-pre-line",
                      )}
                    >
                      {ev.title}
                    </span>
                    {ev.icon}
                    <span className={cn(audiowide.className,"text-white mt-3 text-sm")}>
                      {ev.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* little time line ticks */}
              <div className="absolute inset-x-0 bottom-6 grid grid-cols-8 gap-10 z-10">
                {displayRow.map((_, i) => (
                  <div
                    key={`tick-${rowIndex}-${i}`}
                    className="flex justify-center"
                    style={{ gridColumn: `${i + 1} / span 1` }} // tick under column i+1
                  >
                    <div className="h-6 w-[2px] bg-[#BCF7EF] rounded-t-full" />
                  </div>
                ))}
              </div>

              {/* creates timeline when row is not fully occupied ----- NEEDS FIXING */}
              <div className="absolute inset-x-0 bottom-6 grid grid-cols-8 gap-10 z-0">
                <div
                  className="h-[3px] bg-[#BCF7EF] rounded-full shadow-[0_0_12px_2px_rgba(199,249,255,0.8)]"
                  style={{ gridColumn: `1 / span ${displayRow.length}` }} // width = number of events
                />
              </div>

              {/* Vertical timeline sections - hides every other line to create snake effect */}
              {rowIndex > 0 &&
                (rowIndex % 2 === 0 ? (
                  <div className="absolute bottom-6 left-0 w-[3px] h-65 bg-[#BCF7EF] rounded-full shadow-[0_0_12px_2px_rgba(199,249,255,0.8)]" />
                ) : (
                  <div className="absolute bottom-6 right-0 w-[3px] h-65 bg-[#BCF7EF] rounded-full shadow-[0_0_12px_2px_rgba(199,249,255,0.8)]" />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

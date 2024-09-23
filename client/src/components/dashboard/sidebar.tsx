"use client"

import { SidebarContext } from "@/app/dashboard/layout"
import Link from "next/link"
import * as React from "react"

export function Sidebar() {
  const { isOpen, setIsOpen } = React.useContext(SidebarContext)

  interface menuItem {
    id: number
    name: string
    link: string
  }

  const menuItems: menuItem[] = [
    { id: 1, name: "Status", link: "" },
    { id: 2, name: "Authentication", link: "/auth" },
    { id: 3, name: "Personal", link: "/personal" },
    { id: 4, name: "Contact", link: "/contact" },
    { id: 5, name: "Education", link: "/education" },
    { id: 6, name: "CV", link: "/cv" },
    { id: 7, name: "Submit", link: "/submit" },
  ]

  return (
    <div
      className={`px-2 py-2 md:w-64 md:block absolute bg-white bg-opacity-5 h-[calc(100%-8rem)] ${isOpen ? "w-full" : "hidden"}`}
    >
      <div className="flex flex-col">
        {menuItems.map((item) => {
          return (
            <Link
              href={`/dashboard/${item.link}`}
              className="py-1 mt-1 px-2 border-x-2 rounded-lg hover:border-white  bg-white bg-opacity-5 hover:bg-opacity-15 hover:cursor-pointer transition-all duration-300"
              key={item.id}
              onClick={() => setIsOpen(false)}
            >
              <p className="text-xl font-medium text-center md:text-left">{item.name}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

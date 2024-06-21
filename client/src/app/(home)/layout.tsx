import React from 'react';
import "@/styles/home.css"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-homepage-gradient flex-1 flex flex-col content-center items-center justify-center">
      <div className="w-full min-h-[110px] lg:hidden"/>
      {children}
      <div className="w-full min-h-[110px] lg:hidden"/>
    </div>
  )
}

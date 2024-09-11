"use client"

import * as React from "react";

import Sidebar from "@/components/details/sidebar";
import Header from "@/components/details/header";

export const BackgroundContext = React.createContext({
    isFinalSubmitHovering: false,
    setIsFinalSubmitHovering: (hovering: boolean) => {}
});

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [isFinalSubmitHovering, setIsFinalSubmitHovering] = React.useState(false);

    return (
      <BackgroundContext.Provider value={{ isFinalSubmitHovering, setIsFinalSubmitHovering}}>
        <main className="min-h-[100vh] relative">
          <div className={`absolute top-0 bottom-0 left-0 right-0 h-full transition-all duration-1000 ease-in-out bg-gradient-to-t from-green-500/40 to-transparent to-50% z-0 ${isFinalSubmitHovering ? "opacity-100" : "opacity-0"}`}></div>
            <div className="min-h-[100vh] relative z-10">
              <Header />
              <Sidebar />
                <div className="ml-64 py-16 pl-16 pr-64">
                    {children}
                </div>
            </div>
        </main>
      </BackgroundContext.Provider>
    );
  }
  
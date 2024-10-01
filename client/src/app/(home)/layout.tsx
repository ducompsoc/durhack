import Navbar from "@/components/navbar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="fixed top-0 overflow-visible w-[100%] z-40">
        <Navbar />
      </div>

      {children}
    </>
  )
}

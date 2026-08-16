export default function Hero() {
  return (
    <>
      <div className="flex flex-col items-stretch justify-center h-screen">
        {/* Top half */}
        <div className="flex-1">
          <div className="flex flex-row h-full justify-center items-center align-middle">
            <h1 className="text-white text-5xl font-bold">DurHack</h1>
          </div>
        </div>
        {/* Bottom half */}
        <div className="flex-1">
          <div className="flex flex-row justify-center items-center">
            <div className="ellipse"></div>
          </div>
        </div>
      </div>
    </>
  )
}

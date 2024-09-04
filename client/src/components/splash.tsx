export default function Splash() {
    return (
        <div className="h-[3000px]">
            <div id="outer-ring" className="rounded-[50%] absolute h-[94rem] w-[94rem] top-[-35rem]"></div>
            <div id="inner-ring" className="rounded-[50%] absolute h-[56rem] w-[56rem] top-[-16rem]"></div>
            <img src="/assets/icons/moon.png" alt="splash" className="h-[32rem] w-[32rem] top-[-4rem] mx-auto rounded-[50%] transition-all duration-500 hover:transition-all hover:duration-300 absolute" id="moon"/>
        </div>
    )
}
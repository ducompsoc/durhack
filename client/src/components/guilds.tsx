
export default function Guilds() {
    return (
        <div className="text-center ">
            <h1 className="text-3xl font-bold">
                <span>Guilds</span>
            </h1>

            <div className="w-1/5 h-0.5 mx-auto bg-gradient-to-r from-transparent via-white to-transparent my-2"></div>

            <div className="text-center text-lg text-xl p-4 ">
                This year, we're introducing <b className="text-amber-300">'Guilds'</b>! These will gather teams of hackers together into larger groups, in which
                they will be able to compete for small prizes by completing challenges!
                <br/>
                <br/>
                Don't worry, you'll still make your project in a team of 4 - guilds are like a house system (think Harry Potter!).
                <br/>
                &nbsp;
            </div>

            <div className="container mx-auto ">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-16 w-full">
                    <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/pegasus/icon.svg"></object>
                    <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/cygnus/icon.svg"></object>
                    <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/lyra/icon.svg"></object>
                    <object className="w-full h-auto mx-auto shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/orion/icon.svg"></object>
                </div>
            </div>
        </div>
    );
}

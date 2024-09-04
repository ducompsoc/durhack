
export default function Guilds() {

    return (
        <div className="text-center p-4">
            <h1 className="text-3xl font-bold mb-4">
                <span>Guilds</span>
            </h1>

            <div className="container mx-auto p-16 ">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 w-fill">
                    <object className="w-60 h-60 mx-auto rounded-full shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/pegasus/icon.svg"></object>
                    <object className="w-60 h-60 mx-auto rounded-full shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/cygnus/icon.svg"></object>
                    <object className="w-60 h-60 mx-auto rounded-full shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/lyra/icon.svg"></object>
                    <object className="w-60 h-60 mx-auto rounded-full shadow-md" type="image/svg+xml" data="/assets/graphics/guilds/orion/icon.svg"></object>
                <div/>
            </div>
        </div>
        </div>
    );
}

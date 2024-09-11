export function LinkBox({links}: { links: string[] }) {
    return (
        <div className="bg-white bg-opacity-10 py-8 px-32 rounded-md mb-8 mt-2">
            { links.map((link) => {
                return (
                    <div className="bg-white bg-opacity-10 rounded-sm p-4 my-4 text-center hover:cursor-pointer">
                        { link }
                    </div>
                )
            })}
        </div>
    )
}
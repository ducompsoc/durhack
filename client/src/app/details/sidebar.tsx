"use client"

export function Sidebar(selectPage: Function) {
    interface menuItem {
        name: string,
        link: string
    }

    const menuItems: menuItem[] = [
        {name: 'Home', link: 'home'},
        {name: 'Accounts', link: 'accounts'},
        {name: 'Contact', link: 'contact'}
    ];

    return (
        <div className="px-2 my-2 w-64 absolute">
            <div className="flex flex-col">
            {
                menuItems.map((item) => {
                    return (
                        <div onClick={() => selectPage(item.link)} className="py-1 mt-1 px-2 border-x-2 rounded-lg hover:border-white  bg-white bg-opacity-5 hover:bg-opacity-15 hover:transition-all duration-300">
                            <p className="text-xl font-medium">{ item.name }</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
"use client"

export function Sidebar() {
    interface menuItem {
        name: string,
        link: string
    }

    const menuItems: menuItem[] = [
        {name: 'Home', link: '/'},
        {name: 'Tab2', link: '/'},
        {name: 'Tab3', link: '/'}
    ];

    return (
        <div className="px-2 my-2 border-r-2 w-64 min-h-[100vh]">
            <div className="flex flex-col">
            {
                menuItems.map((item) => {
                    return (
                        <a href={'details/' + item.link} className="py-1 px-2 border-x-2 border-transparent rounded-lg hover:border-gray-100 hover:bg-white hover:bg-opacity-15">
                            <p className="text-xl font-medium">{ item.name }</p>
                        </a>
                    )
                })
            }
            </div>
        </div>
    )
}
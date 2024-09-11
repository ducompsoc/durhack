"use client"

import Link from 'next/link';

export default function Sidebar() {
    interface menuItem {
        id: number,
        name: string,
        link: string
    }

    const menuItems: menuItem[] = [
        {id: 1, name: 'Status', link: ''},
        {id: 2, name: 'Personal', link: '/personal'},
        {id: 3, name: 'Contact', link: '/contact'},
        {id: 4, name: 'Education', link: '/education'},
        {id: 5, name: 'Authentication', link: '/auth'},
        {id: 6, name: 'Submit', link: '/submit'},
    ];

    return (
        <div className="px-2 py-2 w-64 absolute bg-white bg-opacity-5 h-[calc(100%-8rem)]">
            <div className="flex flex-col">
            {
                menuItems.map((item) => {
                    return (
                        <Link href={`/details/${item.link}`} className="py-1 mt-1 px-2 border-x-2 rounded-lg hover:border-white  bg-white bg-opacity-5 hover:bg-opacity-15 hover:cursor-pointer transition-all duration-300" key={item.id}>
                            <p className="text-xl font-medium">{ item.name }</p>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}
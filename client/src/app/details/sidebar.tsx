"use client"

import Link from 'next/link';

export function Sidebar({selectPage}: any) {
    interface menuItem {
        name: string,
        link: string
    }

    const menuItems: menuItem[] = [
        {name: 'Personal', link: 'home'},
        {name: 'Contact', link: 'contact'},
        {name: 'Education', link: 'education'},
        {name: 'Authentication', link: 'auth'},
        {name: 'Submit', link: 'submit'},
    ];

    return (
        <div className="px-2 py-2 w-64 absolute bg-white bg-opacity-5 h-[calc(100%-8rem)]">
            <div className="flex flex-col">
            {
                menuItems.map((item) => {
                    return (
                        <div onClick={() => selectPage(item.link)} className="py-1 mt-1 px-2 border-x-2 rounded-lg hover:border-white  bg-white bg-opacity-5 hover:bg-opacity-15 hover:cursor-pointer transition-all duration-300">
                            <p className="text-xl font-medium">{ item.name }</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
import React from "react";
import Link from 'next/link';

function HomePage() {

return(
    <div className="items-center justify-center bg-gradient-to-br from-pink-100 to-pink-400">
        <div className="text-black container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
            <div className="flex justify-between">
                <h1 className="font-serif text-3xl font-medium">KittyMail</h1>
            </div>
        </div>
        <div className="h-32 md:h-40"></div>
        <p className="font-sans text-4xl font-bold text-black max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
            Hello Kitty theme E-mail client for Kitty Lovers.
        </p>
        <div className="h-10"></div>
        <p className="font-serif text-xl text-black md:pr-10">
        Designed exclusively for folks who love all things cute and stylish!
        </p>

        <div className="p-8 flex justify-start gap-4 items-center">
            <Link href="/pages/contact" className="block w-full max-w-xs mx-auto aspect-square">
                <div className="bg-pink-100 rounded-lg shadow hover:shadow-lg transition-shadow h-32 w-full flex items-center justify-center cursor-pointer">
                    {/* Add your content here */}
                    <span className="text-pink-600 font-medium">Compose Email</span>
                </div>
            </Link>
            <Link href="pages/inbox" className="block w-full max-w-xs mx-auto aspect-square">
                <div className="bg-pink-100 rounded-lg shadow hover:shadow-lg transition-shadow h-32 w-full flex items-center justify-center cursor-pointer">
                    {/* Add your content here */}
                    <span className="text-pink-600 font-medium">View Inbox</span>
                </div>
            </Link>
        </ div>
    </div>
)
}

export default HomePage
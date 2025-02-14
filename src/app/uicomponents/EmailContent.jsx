import React from "react";

function EmailContent() {

    return (
        <div className="w-1/2 h-screen bg-pink-200 p-4 rounded-none shadow-lg">
            <div className="border-b border-pink-400 pb-2">
                <h2 className="text-xl font-semibold text-pink-800">this is where your email heading will go</h2>
                <p className="text-sm text-pink-600">From: emailaddress@email.com</p>
                <p className="text-sm text-pink-600">Date: 02/14/2024</p>
            </div>
            <div className="mt-4 p-4  w-full h-64 ">
                <p className="text-pink-700"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id nibh dignissim, iaculis dolor sed, semper ante. </p>
            </div>
        </div>
    )
}
export default EmailContent
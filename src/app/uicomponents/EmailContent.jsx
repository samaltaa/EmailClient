import React from "react";

function EmailContent({email}) {

    return (
        <div className="w-full h-screen bg-pink-200 p-4 rounded-none shadow-lg">
            <div className="border-b border-pink-400 pb-2">
                <h2 className="text-xl font-semibold text-pink-800">
                    {email.subject}
                </h2>
                <p className="text-sm text-pink-600">From: {email.from}</p>
                <p className="text-sm text-pink-600">Date: {new Date(email.date).toLocaleString()}</p>
            </div>
            <div className="mt-4 p-4  w-full h-64 ">
                <p className="text-pink-700"> 
                {typeof email.content === 'string'
                    ? email.content.slice(0, 200) + '...'
                    : 'Content not available'}
                     </p>
            </div>
        </div>
    )
}
export default EmailContent
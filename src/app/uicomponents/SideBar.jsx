'use client'
import React from "react";
import useFetchEmails from '../hooks/useFetchEmails'
import Loader from "@/app/uicomponents/Loader"


function SideBar () {
    const { emails, loading, error } = useFetchEmails();
    
    if (loading) return (
        <Loader/>
    );
    return (
        <div className="flex flex-col h-screen w-64 bg-gradient-to-br from-pink-200 to-pink-400 text-white p-4">
            <div className="flex justify-between gap-1 h-10 mb-4">
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                    Contacts
                </button>
                <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                    Home
                </button>
            </div>

            <div className="overflow-y-auto">
                {emails.map((email) => (
                        <div key={email.id} className="p-2 bg-pink-300 hover:bg-gray-700 cursor-pointer border border-pink-500">
                            <div className="font-bold text-sm">{email.subject}</div>
                            <div className="text-xs text-gray-400">{email.from}</div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SideBar
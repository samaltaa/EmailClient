'use client'
import React from "react";

function SideBar () {
    //mock data for now
    //TODO: wrap component in HOC to populate with API data
    const emails = [
        { id: 1, subject: "Meeting Reminder", from: "boss@company.com" },
        { id: 2, subject: "Your Order Confirmation", from: "noreply@store.com" },
        { id: 3, subject: "Weekend Plans?", from: "friend@example.com" },
        { id: 4, subject: "Payment Received", from: "finance@company.com" },
        { id: 5, subject: "Invitation: Project Launch", from: "events@company.com" },
        { id: 6, subject: "Meeting Reminder", from: "boss@company.com" },
        { id: 7, subject: "Your Order Confirmation", from: "noreply@store.com" },
        { id: 8, subject: "Let's Go Hiking", from: "friend@example.com" },
        { id: 9, subject: "Payment Received", from: "finance@company.com" },
        { id: 10, subject: "Invitation: Project Launch", from: "events@company.com" },
        { id: 11, subject: "Your Order Confirmation", from: "noreply@store.com" },
        { id: 12, subject: "Weekend Plans?", from: "friend@example.com" },
        { id: 13, subject: "Payment Received", from: "finance@company.com" },
        { id: 14, subject: "Invitation: Project Launch", from: "events@company.com" },
    ];

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
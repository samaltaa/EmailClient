'use client'
/*
THIS COMPONENT WILL MAP() ALL THE INBOX DATA 
AND RENDER IT ON THE CLIENT SIDE 
*/
import React, { useState, useEffect } from "react";

function Inbox(){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('/api/checkEmail');
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to fetch emails');
                }
                
                if (result.success) {
                    setData(result.emails);
                } else {
                    throw new Error(result.error || 'Failed to load emails');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    if (isLoading) return (
        <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900">  </div>
        </div>
    );

    if (error) return (
        <div className="p-4 text-red-600 bg-red-50 rounded-md">
            Error: {error}
        </div>
    );

    return(
        <div className="p-4">
            {data && data.length > 0 ? (
                <ul className="space-y-4">
                    {data.map((email, index) => (
                        <li key={email.uid || index} className="border rounded-lg p-4 shadow-sm">
                            <div className="text-sm text-gray-500">
                                {new Date(email.date).toLocaleString()}
                            </div>
                            <div className="font-medium">
                                From: {email.from.map(f => f.name || f.address).join(', ')}
                            </div>
                            <div className="font-bold">
                                {email.subject}
                            </div>
                            <div className="mt-2 text-gray-700 whitespace-pre-wrap">
                                {email.content}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No emails found.</p>
            )}
        </div>
    )
}

export default Inbox;
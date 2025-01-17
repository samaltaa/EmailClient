'use client'
/*
THIS COMPONENT WILL MAP() ALL THE INBOX DATA 
AND RENDER IT ON THE CLIENT SIDE 
*/
import React, { useState, useEffect } from "react";

function Inbox() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);

    //Hook runs when component mounts
    useEffect(() => {
        //Async function to fetch emails from our API
        const fetchEmails = async () => {
            try {
                //Fetch data from our API endpoint 
                const response = await fetch('/api/checkEmail');
                console.log('Got response:', response.status);
                
                //Parse Json response
                const result = await response.json();
                console.log('Parsed response:', result);
                
                //Check if response went through
                if (!response.ok) {
                    throw new Error(result.error || `HTTP error! status: ${response.status}`);
                }
                
                if (result.success) {
                    setData(result.emails); //store emails
                    setDebugInfo(result.timestamp); //store timestamp
                } else {
                    throw new Error(result.error || 'Failed to load emails');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false); //Turn off loading state
            }
        };

        //Execite the fetching function
        fetchEmails();
    }, []); //The empty dependency array prevents this from 
            //running infinitely on mount

    if (isLoading) return (
        <div className="p-4">
            <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
            <div className="text-center text-gray-500">
                Loading emails... This might take a few seconds.
            </div>
        </div>
    );

    if (error) return (
        <div className="p-4">
            <div className="text-red-600 bg-red-50 rounded-md p-4">
                Error: {error}
            </div>
            <div className="mt-2 text-gray-500">
                Debug info: {debugInfo || 'No debug info available'}
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <div className="mb-4 text-sm text-gray-500">
                Last updated: {debugInfo}
            </div>
            
            {data && data.length > 0 ? (
                <ul className="space-y-4">
                    {data.map((email, index) => (
                        <li key={email.uid || index} className="border rounded-lg p-4 shadow-sm">
                            <div className="text-sm text-gray-500">
                                {new Date(email.date).toLocaleString()}
                            </div>
                            <div className="font-medium">
                                From: {email.from}
                            </div>
                            <div className="font-bold">
                                {email.subject}
                            </div>
                            <div className="mt-2 text-gray-700 whitespace-pre-wrap">
                                {typeof email.content === 'string' 
                                    ? email.content.slice(0, 200) + '...' 
                                    : 'Content not available'}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">
                    No emails found... {data ? `(${data.length} emails loaded)` : '(No data)'}
                </p>
            )}
        </div>
    );
}

export default Inbox;
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
        fetch('/api/checkEmail')
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setData(data.emails);
            } else {
                setError(data.error || "Failed to load emails");
            }
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return(
        <div>
            {data && data.length > 0 ? (
                <ul>
                    {data.map((email, index) => (
                        <li key={index}>
                            <strong>From:</strong> {email.from} <br />
                            <strong>Subject:</strong> {email.subject} <br />
                            <strong>Content:</strong> <div>{email.content}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No emails found.</p>
            )

            }
        </div>
    )
}

export default Inbox;
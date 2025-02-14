'use client'
/*
THIS COMPONENT WILL MAP() ALL THE INBOX DATA 
AND RENDER IT ON THE CLIENT SIDE 
*/
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/app/uicomponents/Loader"
import {showEmailList} from '@/utils/utils'

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
    
    //TODO: make a reusable <Loading/> component for when data is being fetched 
    if (isLoading) return (
        <Loader/>
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
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Inbox</CardTitle>
                <CardDescription>
                    Last updated: {debugInfo}
                </CardDescription>
            </CardHeader>
            <CardContent >
                {showEmailList(data)}
            </CardContent>
            <CardFooter >
                <Button variant='outline'>Refresh</Button>
                <Button variant='outline'>Compose</Button>
            </CardFooter>
        </Card>
    );
}

export default Inbox;
import { useState, useEffect } from "react";

function useFetchEmails() {

    const [emails, setEmails] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        //Function to fetch emails async
        const fetchEmails = async () => {
            try {
                // fetch email data from API endpoint 
                const response = await fetch('/api/checkEmail');
                console.log('Response status:', response.status);

                // parse the response into JSON
                const result = await response.json();
                console.log('Response data: ', result);

                // handle errors 
                if (!response.ok) {
                    throw new Error(result.error || `HTTP error! status: ${response.status}`);
                }

                // store emails if request was successful 
                if (result.success) {
                    setEmails(result.emails);
                } else {
                    throw new Error(result.error || 'Failed to load emails');
                }
            } catch (err) {
                console.error('Fetch error: ', err);
                setError(err.message);
            } finally {
                // Stop the loading state after the data is fetched 
                setLoading(false);
            }
        };

        // call the function to fetch emails 
        fetchEmails();
    }, [])

    return { emails, loading, error };
}

export default useFetchEmails;
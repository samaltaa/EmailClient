/*
THIS ROUTE WILL FETCH THE IMAP DATA 

TODO: remove all the debugging logs 
*/
import { NextRequest, NextResponse } from 'next/server';
import { ImapFlow } from 'imapflow';

//this function creates a new IMAP client with the required configurations
//the function will return our customized ImapFloq instance
const createClient = () => new ImapFlow({
    host: 'imap.gmail.com', //Gmail's IMAP server address
    port: 993, //Standard port
    secure: true, //use SSL/TLS

    auth: {
        user: process.env.MY_EMAIL as string,
        pass: process.env.MY_PASSWORD as string,
    },
});

//Main function to fetch emails from the IMAP server
async function fetchEmails() {
    const client = createClient();
    console.log('Starting email fetch...'); //debugging log
    
    try {
        //Establish connection to the IMAP server
        await client.connect();
        console.log('Connected to IMAP server');
        
        //Use a lock on the INBOX mailbox
        //Locks prevent simultanous operations from interferring with our current operation
        const lock = await client.getMailboxLock('INBOX');
        console.log('Acquired mailbox lock');
        
        try {
            const emails = [];
            // Fetch only the last 5 emails for testing
            //fetch() returns an async iterator of the emails
            for await (const message of client.fetch('1:5', {
                envelope: true,
                bodyStructure: true,
                source: true,
            })) {
                console.log(`Processing message ${message.uid}`);
                
                try {
                    //Extract relevant information from each message
                    emails.push({
                        uid: message.uid,
                        subject: message.envelope?.subject || 'No Subject',
                        from: message.envelope?.from?.[0]?.address || 'Unknown',
                        date: message.envelope?.date || new Date(),
                        // For testing, just get the raw source
                        content: message.source?.toString() || 'No content'
                    });
                } catch (messageError) {
                    console.error('Error processing message:', messageError);
                }
            }
            
            console.log(`Processed ${emails.length} emails`);
            return emails;
            
        } finally {
            //Release the lock when done
            lock.release();
            console.log('Released mailbox lock');
        }
    } catch (error) {
        console.error('Error in fetchEmails:', error);
        throw error;
    } finally {
        //Logout once done
        try {
            await client.logout();
            console.log('Logged out successfully');
        } catch (logoutError) {
            console.error('Error during logout:', logoutError);
        }
    }
}

//API handler for GET requests 
export async function GET(req: NextRequest) {
    console.log('Starting GET request handler');
    
    try {
        const emails = await fetchEmails();
        console.log('Emails fetched successfully');
        
        //Returns successful response with email content and timestamp
        return NextResponse.json({ 
            success: true, 
            emails,
            timestamp: new Date().toISOString() 
        });
    } catch (error) {
        console.error('Request handler error:', error);
        //Return error if operation fails 
        return NextResponse.json(
            { 
                success: false, 
                error: 'Failed to fetch emails',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
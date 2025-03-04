/*
THIS ROUTE WILL FETCH THE IMAP DATA 

TODO: develop all the TODO blocks
*/
import { NextRequest, NextResponse } from 'next/server';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

//TODO: Helper function to convert stream to buffer



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

async function streamToBuffer(readableStream: any): Promise<Buffer> {
    // If it's already a buffer or string, convert directly
    if (Buffer.isBuffer(readableStream)) {
      return readableStream;
    }
    
    if (typeof readableStream === 'string') {
      return Buffer.from(readableStream);
    }
  
    // Check if it's an async iterable (modern stream interface)
    if (readableStream[Symbol.asyncIterator]) {
      const chunks: Buffer[] = [];
      for await (const chunk of readableStream) {
        chunks.push(Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    }
  
    // Try using Buffer.from directly
    try {
      return Buffer.from(readableStream);
    } catch (err) {
      // If all else fails, try toString method
      if (typeof readableStream.toString === 'function') {
        return Buffer.from(readableStream.toString());
      }
  
      console.error('Could not convert stream to buffer:', err);
      throw new Error('Unable to convert stream to buffer');
    }
  }
  
  //
  async function fetchEmails() {
    const client = createClient();
    
    try {
        await client.connect();
        const lock = await client.getMailboxLock('INBOX');
        
        try {
            const emails = [];
            
            for await (const message of client.fetch('1:15', {
                envelope: true,
                bodyStructure: true,
                source: true,
                bodies: ['TEXT', 'HEADER', 'HTML']
            })) {
                try {
                    let parsedEmail;
                    let emailContent = '';
                    let htmlContent = '';

                    // Log raw message structure for debugging
                    console.log('Message UID:', message.uid);
                    console.log('Message body keys:', message.body ? Object.keys(message.body) : 'No body');

                    // Try parsing TEXT body
                    if (message.body?.TEXT) {
                        try {
                            emailContent = message.body.TEXT.toString();
                            console.log('TEXT content length:', emailContent.length);
                        } catch (textError) {
                            console.error('Error converting TEXT:', textError);
                        }
                    }

                    // Try parsing HTML body
                    if (message.body?.HTML) {
                        try {
                            htmlContent = message.body.HTML.toString();
                            console.log('HTML content length:', htmlContent.length);
                        } catch (htmlError) {
                            console.error('Error converting HTML:', htmlError);
                        }
                    }

                    // Fallback to source if no body content
                    if ((!emailContent && !htmlContent) && message.source) {
                        try {
                            const buffer = await streamToBuffer(message.source);
                            parsedEmail = await simpleParser(buffer);
                            
                            emailContent = parsedEmail.text || '';
                            htmlContent = parsedEmail.html || '';
                            
                            console.log('Parsed email content lengths:', {
                                text: emailContent.length,
                                html: htmlContent.length
                            });
                        } catch (sourceParseError) {
                            console.error('Error parsing source:', sourceParseError);
                        }
                    }

                    // Determine the best content to display
                    const displayContent = htmlContent || emailContent || 'No content available';

                    // Extract and push email information
                    emails.push({
                        uid: message.uid,
                        subject: message.envelope?.subject || 'No Subject',
                        from: message.envelope?.from?.[0]?.address || 'Unknown',
                        date: message.envelope?.date || new Date(),
                        textContent: emailContent,
                        htmlContent: htmlContent,
                        content: displayContent
                    });

                    // Log each email's content for verification
                    console.log(`Email ${message.uid} content:`, {
                        subject: message.envelope?.subject,
                        contentLength: displayContent.length
                    });
                } catch (messageError) {
                    console.error('Error processing individual message:', messageError);
                }
            }
            
            console.log('Total emails fetched:', emails.length);
            return emails;
        } finally {
            lock.release();
        }
    } catch (error) {
        console.error('Error in fetchEmails:', error);
        throw error;
    } finally {
        try {
            await client.logout();
        } catch (logoutError) {
            console.error('Error during logout:', logoutError);
        }
    }
}
  
//API handler for GET requests 
export async function GET(req: NextRequest) {
    
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
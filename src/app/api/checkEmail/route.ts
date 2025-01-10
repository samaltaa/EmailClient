/*
THIS ROUTE WILL FETCH THE IMAP DATA 
*/
import { NextRequest, NextResponse} from 'next/server';
import { ImapFlow } from 'imapflow';
import { ParsedMail, simpleParser } from 'mailparser';


const createClient = () => new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
        user: process.env.MY_EMAIL as string,
        pass: process.env.MY_PASSWORD as string,
    },
});

//Helper function to convert stream to buffer 
const streamToBuffer = async (stream: NodeJS.ReadableStream): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
};

async function fetchEmails(){
   const client = createClient();
   try {
        await client.connect();
        const lock = await client.getMailboxLock('INBOX');
        
        try {
            const emails = [];
            for await (const message of client.fetch('1:10', {
                envelope: true,
                bodyStructure: true,
                bodyParts: ['1'],
                source: true,
                uid: true,
            })) {
                const { content } = await client.download(message.uid);
                const buffer = await streamToBuffer(content);
                const parsedEmail = await simpleParser(buffer);

                emails.push({
                    uid: message.uid,
                    subject: message.envelope.subject,
                    from: message.envelope.from,
                    content: parsedEmail.text || parsedEmail.html || '',
                    date: message.envelope.date,
                });
            }
            return emails;
        } finally {
            //Release lock before logout
            lock.release();
        }
   } finally {
    //make sure the client is closed
    try {
        await client.logout();
    } catch (error) {
        console.error('Logout error:', error);
    }
   }
}

export async function GET(req: NextRequest){
    try {
        const emails = await fetchEmails();
        return NextResponse.json({ success: true, emails });
    } catch (error) {
        console.error('Email fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch emails'},
            { status: 500 }
        );
    }
}



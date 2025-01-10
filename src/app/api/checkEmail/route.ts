/*
THIS ROUTE WILL FETCH THE IMAP DATA 
*/
import { NextRequest, NextResponse} from 'next/server';
import { ImapFlow } from 'imapflow';


const client = new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
        user: process.env.MY_EMAIL as string,
        pass: process.env.MY_PASSWORD as string,
    },
});


async function checkEmail(){
   await client.connect();
   const lock = await client.getMailboxLock('INBOX');
   try {
        const emails =[];
        for await (const message of client.fetch('1:10', {
            envelope: true,
            bodyStructure: true,
            bodyParts: ['1'],
            source: false, 
            uid: true,
        })) {
            const { content } = await client.download(message.uid);
            emails.push({
                subject: message.envelope.subject,
                from: message.envelope.from,
                content: content.toString(),
            });
        }
        return emails;
   } finally {
    lock.release();
    await client.logout();
   }
}

export async function GET(req: NextRequest){
    try {
        const emails = await checkEmail();
        return NextResponse.json({ success: true, emails});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Failed to fetch emails'}, {status: 500});
    }
}



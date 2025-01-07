import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import MailMessage from "nodemailer/lib/mailer";

export async function POST(request: NextRequest){
    const { email, name, message} = await request.json();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        /*
            the service being 'gmail' just means that these are the settings:

            host: "smtp.gmail.com",
            port: 465,
            secure: true

            link to other settings: https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json

        */
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: process.env.MY_PASSWORD,

        subject: `Message from ${name} (${email})`,
        text: message,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function(err){
                if(!err){
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });
    try {
        await sendMailPromise();
        return NextResponse.json({message: 'Email sent'});
    } catch(err) {
        return NextResponse.json({error:err}, {status:500})
    }
};


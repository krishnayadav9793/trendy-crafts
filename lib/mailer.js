import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "trendycarfts@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
})
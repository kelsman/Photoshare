const nodemailer = require('nodemailer');
const sibTransport = require('nodemailer-sendinblue-transport');


const sendEmail = (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        Port: 587,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: "photoshare@example.com",
        to: options.to,
        subject: options.subject,
        html: options.text,

    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err.message);
        }
        console.log(info)
    })

}

module.exports = sendEmail;
const nodemailer = require('nodemailer');



const sendEmail = (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }

    });

    const mailOptions = {
        from: "photoshare@example.com",
        to: options.to,
        subject: options.subject,
        html: options.text,

    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err.message);
        }
        console.log(info)
    })

}

module.exports = sendEmail;
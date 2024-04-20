const {replacePlaceholders, templateContent} = require("../mail/mail-utils");
const { MailtrapClient } = require("mailtrap");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

exports.sendMail = async (req, res) => {
    const { email, subject, message, name } = req.body;

    // store attachment if provided
    const attachmentData = req.file ? {
        filename: req.file.originalname,
        content: req.file.buffer
    } : null;

    const TOKEN = process.env.MAILTRAP_PASS;
    const ENDPOINT = process.env.SMTP_HOST;

    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
        email: process.env.SENDER_EMAIL,
        name: "Zack Abessolo",
    };
    // replace placeholders in the email template with received data
    const emailHtml = replacePlaceholders(templateContent, { name, subject, email, message });

    client
        .send({
            from: sender,
            to: [process.env.RECIPIENT_EMAIL, 'zackabess95@gmail.com'],
            subject: `Nouveau message de ${name} avec objet ${subject}`,
            text: `Nouveau message \n\nObjet: ${subject}\nDE: ${name}\nEmail: ${email}\n\nMessage:\n\n${message}`,
            // html: emailHtml,
            // attachments: attachmentData ? [attachmentData] : [],
            category: "Nouveau message",
        })
        .then(
            (response) => {
                console.log("Message sent successfully", response);
                return res.status(200).send({ message: "Message sent successfully" });
            },
            (error) => {
                console.error("An error occurred while sending the message", error);
                return res.status(500).send({ error: "An error occurred while sending the message" });
            }
        )
}
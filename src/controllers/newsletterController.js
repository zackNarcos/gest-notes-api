const {replacePlaceholders, templateContent} = require("../mail/mail-utils");
const { MailtrapClient } = require("mailtrap");
const NewsLetter = require("../models/newsletterModel");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

exports.subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        const newSubscriber = await NewsLetter.create({mail: email});

        const TOKEN = process.env.MAILTRAP_PASS;
        const ENDPOINT = process.env.SMTP_HOST;

        const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

        const sender = {
            email: process.env.SENDER_EMAIL,
            name: "Zack Abessolo",
        };

        // replace placeholders in the email template with received data
        const emailHtml = replacePlaceholders(templateContent, { email });

        client
            .send({
                from: sender,
                to: email,
                subject: `Confirmation d'inscription à la newsletter`,
                text: `Merci de vous être inscrit à notre newsletter`,
                html: emailHtml,
                category: "Nouvelle inscription",
            })
            .then()
            .catch((err) => {
                console.log(err);
            });
        return res.status(200).send({message: "Mail enregistré avec succès"});
    } catch (error) {
        return res.status(500).send({error: "An error occurred while saving the subscriber"});
    }
}

exports.unSubscribe = async (req, res) => {
    const {email} = req.body;
    try {
        const deletedSubscriber = await NewsLetter.destroy({
            where: {mail: email}
        });
        return res.status(200).send({message: "Mail supprimé avec succès: ", deletedSubscriber});
    } catch (error) {
        return res.status(500).send({error: "An error occurred while deleting the subscriber"});
    }
}
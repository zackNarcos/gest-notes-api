//store email template path and store the emailTemplate in templateContent
const {readFileSync} = require("fs");
const templatePath = 'src/mail/email-template.html';
const templateContent = readFileSync(templatePath, 'utf-8');

// create a function to replace placeholders in the email template with received data
function replacePlaceholders(html, data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const placeholder = `{{${key}}}`;
            html = html.replace(new RegExp(placeholder, 'g'), data[key]);
        }
    }
    return html;
}

module.exports = { templateContent, replacePlaceholders };
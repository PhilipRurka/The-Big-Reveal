import client, { MailDataRequired } from "@sendgrid/mail"
import { registrationTemplate } from "../email-templates/registrationTemplate"

export const SendGrid = () => {
  client.setApiKey('SG.1234567890') // Update apikey

  const message: MailDataRequired | MailDataRequired[] = {
    to: 'hey@philiprurka.com',
    from: 'hey@philiprurka.com',
    subject: 'Welcome to the Goalden Club!',
    content: [{ type: 'text/html', value: registrationTemplate() }]
  }
  
  client.send(message).then(() => {
      console.dir('Email sent')
    })
    .catch((error: any) => {
      console.error(error)
    })
}
import client, { MailDataRequired } from "@sendgrid/mail"
import { registrationTemplate } from "../email-templates/registrationTemplate"

export const SendGrid = () => {
  client.setApiKey('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')

  const message: MailDataRequired | MailDataRequired[] = {
    to: 'hey@philiprurka.com',
    from: 'hey@philiprurka.com',
    subject: 'Welcome to the Goalden Club!',
    content: [{ type: 'text/html', value: registrationTemplate() }]
  }
  
  client.send(message).then(() => {
      console.log('Email sent')
    })
    .catch((error: any) => {
      console.error(error)
    })
}
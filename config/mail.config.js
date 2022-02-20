import path from 'path'

export const mailConfigOptions = {
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: JSON.parse(process.env.MAIL_SECURE), // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME, // email service username
    pass: process.env.MAIL_PASSWORD // email service password
  }
}

export const mailTemplateConfigOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.join(__dirname, "/../templates"),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, "/../templates"),
  extName: ".handlebars",
}
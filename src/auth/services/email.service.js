import nodemailer from "nodemailer";
import { mailConfigOptions, mailTemplateConfigOptions } from "../../../config/index";
import exphbs from "nodemailer-express-handlebars";

class EmailService {
  from;
  constructor() {
    this.nodeMailer = nodemailer;
  }

  async sendMail(mailInfo) {
    try {
      const transporter = this.nodeMailer.createTransport(mailConfigOptions);
      transporter.use("compile", exphbs(mailTemplateConfigOptions));
      const info = await transporter.sendMail(mailInfo);
      if (info) {
        console.log("Message sent: %s", info.messageId);
        return { info: info.messageId, url: this.nodeMailer.getTestMessageUrl() }; // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new EmailService();
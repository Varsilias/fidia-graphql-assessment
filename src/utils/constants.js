import fs from 'fs'
import { join } from 'path'
import { convert } from 'html-to-text'

const html = fs.readFileSync(join(__dirname + '/../../templates/verify.handlebars'), 'utf-8')
const text = convert(html, {
  wordwrap: 80
})
export const SENDER = '"HELLO" daniel@fidia.com'

export const SUBJECT = "Welcome, Please Verify Your account"

export const TEXT = text

export const HTML = html;
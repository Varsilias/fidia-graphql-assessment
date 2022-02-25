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

export const MONGO_UNIQUE_CONSTRAINT_ERROR_CODE = 11000

export const JWT_INVALID_SIGNATURE_ERROR = "JsonWebTokenError"

export const JWT_EXPIRED_ERROR = "TokenExpiredError"

export const JWT_NOT_BEFORE = "NotBeforeError"
import crypto from 'crypto'

const getTokenLength = () => Math.floor(Math.random() * (20 - 16)) + 16

const createToken = () => crypto.randomBytes(getTokenLength()).toString('hex')

export default createToken

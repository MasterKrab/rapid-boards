import { nanoid } from 'nanoid'

const crypto =
  typeof window === 'undefined' ? require('crypto').webcrypto : window.crypto

const generateIdCrypto = () => crypto.randomUUID()

const generateId = crypto?.randomUUID ? generateIdCrypto : nanoid

export default generateId

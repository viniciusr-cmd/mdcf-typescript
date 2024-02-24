import crypto from 'crypto';

// Secret key for hashing
const SECRET = 'MEDCOF-SECRET'; 

// Generate salt for hashing
export const generateSalt = () => crypto.randomBytes(128).toString('base64');

// Hash the password
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

import * as crypto from "node:crypto";

export const hashPassword = (
  password: string,
  salt: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);
      resolve(hash.toString("hex").normalize());
    });
  });
};

export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString("hex").normalize();
};

import CryptoJS from "crypto-js";

const SECURITY_KEY = "Nhai_Single_Sign_On";

export default function encryptPayload(data) {
  // Generate encryption key
  const key = CryptoJS.SHA512(SECURITY_KEY).toString().substring(0, 32);

  // Generate IV (hashed and sliced)
  const ivSeed = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.SHA512(ivSeed).toString().substring(0, 16);

  // Encrypt the data
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  // Format: base64(ciphertext).iv
  const base64Cipher = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return `${base64Cipher}.${iv}`;
}
 
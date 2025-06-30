import CryptoJS from "crypto-js";

const SECURITY_KEY = "Nhai_Single_Sign_On";

export default function decryptPayload(encryptedData) {
  const parts = encryptedData.split('.');
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted data format");
  }

  const base64Ciphertext = parts[0];
  const iv = parts[1];

  const key = CryptoJS.SHA512(SECURITY_KEY).toString().substring(0, 32);

  const decrypted = CryptoJS.AES.decrypt(
    base64Ciphertext,
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  try {
    return JSON.parse(decryptedText);
  } catch (e) {
    throw new Error("Failed to parse decrypted data as JSON",e);
  }
}

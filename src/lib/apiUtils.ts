import crypto from "crypto";

export const apiConfig = {
  apiKey: "e5cf4021-0bb7-4bd5-ad4c-47586c30ec83",
  secretKey: "B2393F2A682087A87EC88087DF5CFB9D",
  passphrase: "nusadexWallet123@",
  projectId: "2a2b08c1ea9f7ba1841bbaaa65a17191",
};

export const createPreHash = (
  timestamp: string,
  method: string,
  path: string,
): string => {
  return timestamp + method + path;
};

// Fungsi untuk membuat signature menggunakan HMAC-SHA256
export const createSignature = (message: string, secretKey: string): string => {
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(message);
  return hmac.digest("base64");
};

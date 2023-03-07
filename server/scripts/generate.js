const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

function generateKeyPair() {
  let i = 0;
  while (i < 3) {
    if (i < 3) {
      const privateKey = secp.utils.randomPrivateKey();
      const publicKey = secp.getPublicKey(privateKey);
      console.log({ pk: toHex(privateKey), pb: toHex(publicKey) });
      i++;
    }
  }
}

generateKeyPair();

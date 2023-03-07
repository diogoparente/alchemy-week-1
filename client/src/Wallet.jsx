import { useAppContext } from "./AppContext";
import * as secp from "ethereum-cryptography/secp256k1";
import server from "./server";

import { useEffect } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

const pubKeyToAddress = (pubKey) => {
  const hash = keccak256(pubKey.slice(1));
  return toHex(hash.slice(-20)).toUpperCase();
};

function Wallet() {
  const { address, balance, setBalance, privateKey } = useAppContext();

  useEffect(() => {
    async function getBalance() {
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }
    getBalance();
  }, [address]);

  return (
    <div className="container wallet">
      <h1>From</h1>

      <label>
        Private key
        <input
          placeholder="Your private key"
          value={privateKey}
          readOnly={true}
        ></input>
      </label>

      <label>
        Wallet Address
        <input
          placeholder="Your address"
          value={address}
          readOnly={true}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

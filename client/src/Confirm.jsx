import { useState } from "react";
import { useAppContext } from "./AppContext";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

import server from "./server";

const hashMessage = (message) => keccak256(Uint8Array.from(message));

function Transfer() {
  const { privateKey, recipient, setBalance } = useAppContext();
  const [sendAmount, setSendAmount] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const sign = async (message) => {
    const hash = hashMessage(message);
    const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
      recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    const sig = toHex(fullSignature);
    return sig;
  };

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      amount: parseInt(sendAmount),
      recipient,
    };
    const signature = await sign(message);
    const transaction = {
      message,
      signature,
    };
    try {
      const {
        data: { balance, message },
      } = await server.post(`send`, transaction);
      setBalance(balance);
      alert(message);
    } catch (ex) {
      alert(ex.response?.data?.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input placeholder="" value={recipient} readOnly={true}></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

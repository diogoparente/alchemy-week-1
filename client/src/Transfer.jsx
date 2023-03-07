import { useAppContext } from "./AppContext";
import * as secp from "ethereum-cryptography/secp256k1";

import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

const pubKeyToAddress = (pubKey) => {
  const hash = keccak256(pubKey.slice(1));
  return toHex(hash.slice(-20)).toUpperCase();
};

function Sender({ value }) {
  const { privateKey, address, setAddress, setPrivateKey, setRecipient } =
    useAppContext();

  const onOptionChange = (e) => {
    const privateKey = e.target.value;
    setPrivateKey(privateKey);
    const pubKey = secp.getPublicKey(privateKey);
    if (pubKey) {
      setAddress(pubKeyToAddress(pubKey));
      setRecipient("");
    }
  };

  const isDisabled = address === value;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="radio"
        name="recipient"
        value={value}
        id={value}
        checked={privateKey === value}
        onChange={onOptionChange}
        disabled={isDisabled}
        style={{ marginLeft: 5 }}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

function Recipient({ value }) {
  const { recipient, address, setRecipient } = useAppContext();

  const onOptionChange = (e) => {
    setRecipient(e.target.value);
  };

  const isDisabled = address === value;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="radio"
        name="recipient"
        value={value}
        id={value}
        checked={recipient === value}
        onChange={onOptionChange}
        disabled={isDisabled}
        style={{ marginLeft: 5 }}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

function Transfer() {
  const { addresses } = useAppContext();

  return (
    <div className="container">
      <form>
        <h1>Pick a private key:</h1>
        {[
          "6e98652a5d627a4de4fe106766dad6ee9130218a81fb51a8d83339ad4f7a7bcb",
          "46a3be91f3b007a6b18708d0863a65e82ee8df73c759e7b1cf59aa7855b02317",
          "ee1cdf691d9adb6082bb6d1363d70108e65edcd0e58beaaf78ce54d11f7138d5",
        ]?.map((value) => (
          <Sender value={value} />
        ))}
      </form>
      <form>
        <h1>Pick a recipient:</h1>
        {addresses.map((value) => (
          <Recipient value={value} />
        ))}
      </form>
    </div>
  );
}

export default Transfer;

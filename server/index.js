const express = require("express");
const app = express();
const cors = require("cors");
const { addresses } = require("../../ecdsa-node/keys");
const crypto = require("./crypto");

const port = 3042;

app.use(cors());
app.use(express.json());

let balances = {
  [addresses[1]]: 100,
  [addresses[2]]: 50,
  [addresses[3]]: 75,
};

app.get("/addresses", (req, res) => {
  const response = Object.values(addresses);
  res.send({ response });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const pubKey = crypto.signatureToPubKey(message, signature);
  const sender = crypto.pubKeyToAddress(pubKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances = {
      ...balances,
      [sender]: balances[sender] - amount,
      [recipient]: balances[recipient] + amount,
    };

    res.send({ message: "Balance updated", balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

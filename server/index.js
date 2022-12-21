const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { recoverKey, getEthAddress, isAddressValid, pipe } = require("./utils");

app.use(cors());
app.use(express.json());

const balances = {};
function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  if (!isAddressValid(address)) {
    res.status(400).send({ message: "Invalid address!" });
    return;
  }

  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/faucet/:address", (req, res) => {
  const { address } = req.params;

  if (!isAddressValid(address)) {
    res.status(400).send({ message: "Invalid address!" });
    return;
  }

  setInitialBalance(address);

  balances[address] += 10;
  const balance = balances[address];

  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { recipient, amount, signature, recovery, messageHash } = req.body;

  if (!isAddressValid(recipient)) {
    res.status(400).send({ message: "Invalid sender address!" });
    return;
  }
  if (amount <= 0) {
    res.status(400).send({ message: "Invalid amount!" });
    return;
  }
  if (!messageHash) {
    res.status(400).send({ message: "Invalid message hash!" });
  }
  const sender = pipe(
    await recoverKey(messageHash, signature, recovery),
    getEthAddress
  )
  if (!sender) {
    res.status(400).send({ message: "Invalid signature!" });
    return
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

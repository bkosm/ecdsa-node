import { useState } from "react";
import server from "./server";

export default function TransferWithSignature({}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");

  const pipeVal = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    if (!sendAmount || !recipient || !signature) {
      alert("Please fill all transfer fields");
      return;
    }

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container wallet" onSubmit={transfer}>
      <h2>Send a transaction with generated signature</h2>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={pipeVal(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address"
          value={recipient}
          onChange={pipeVal(setRecipient)}
        ></input>
      </label>

      <label>
        Sender signature
        <input
          placeholder="Paste a signature"
          value={signature}
          onChange={pipeVal(setSignature)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

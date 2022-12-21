import { useState } from "react";
import server from "./server";
import { isAddressValid } from "./utils";

export default function TransferWithSignature({}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState(0);
  const [messageHash, setMessageHash] = useState("");

  const pipeVal = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault()

    if (!sendAmount || !recipient || !signature || !recoveryBit || !messageHash) {
      alert("Please fill all transfer fields");
      return;
    }

    if (!isAddressValid(recipient)) {
      alert("Invalid recipient address");
      return;
    }

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        amount: parseInt(sendAmount),
        recipient,
        signature,
        recovery: parseInt(recoveryBit),
        messageHash,
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

      <div className="inline">
        <label>
          Sender signature
          <input
            placeholder="Paste a signature"
            value={signature}
            onChange={pipeVal(setSignature)}
          ></input>
        </label>

        <label>
          Message hash
          <input
            placeholder="Paste the hash"
            value={messageHash}
            onChange={pipeVal(setMessageHash)}
          ></input>
        </label>

        <label>
          Recovery bit
          <input
            placeholder="Enter signature's recovery bit"
            type="number"
            defaultValue={0}
            value={recoveryBit}
            onChange={pipeVal(setRecoveryBit)}
          ></input>
        </label>
      </div>

      <input type="submit" className="button" onClick={transfer} />
    </form>
  );
}

import { useState } from "react";
import { hashMessage, isSigned, pipe, signMessage, toHex } from "./utils";

const pipeVal = (setter) => (evt) => setter(evt.target.value);

export default function Signature({}) {
  const [message, setMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [signature, setSignature] = useState("");

  const [recoveryBit, setRecoveryBit] = useState(0);

  const messageHash = pipe(hashMessage(message), toHex);
  const hasError = !isSigned(signature, messageHash, publicKey);


  async function onGenerate(_) {
    if (!message || !privateKey) {
      return;
    }

    const [actual, recoveryBit] = await signMessage(message, privateKey);

    setSignature(toHex(actual));
    setRecoveryBit(recoveryBit);
  }

  return (
    <div className={`container wallet ${hasError && "error"}`}>
      <h2>Signature creator</h2>

      <label>
        Private key (for signing)
        <input value={privateKey} onChange={pipeVal(setPrivateKey)} />
      </label>

      <label>
        Public key (for verification check)
        <input value={publicKey} onChange={pipeVal(setPublicKey)} />
      </label>

      <hr/>

      <label>
        Message
        <input value={message} onChange={pipeVal(setMessage)} />
      </label>

      <label>
        Message hash
        <input
          disabled={true}
          value={messageHash}
          onChange={pipeVal(setMessage)}
          readOnly
        />
      </label>

      <hr/>

      <label>
      <b>Actual signature</b>
        <input
          value={signature}
          onChange={pipeVal(setSignature)}
        ></input>
      </label>

      <label>
        <b>Recovery bit</b>
        <input
          disabled={true}
          value={recoveryBit}
          readOnly
        ></input>
      </label>

      <input className="button" value="Make signature" onClick={onGenerate} />
    </div>
  );
}

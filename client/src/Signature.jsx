import server from "./server";
import { useState } from "react";

export default function Signature({ keys }) {
  const [signature, setSignature] = useState("signature");

  function onGenerate(evt) {
    console.log(`Generate signature ${evt}`);
  }

  return (
    <div className="container wallet">
      <h2>Signature creator</h2>

      <label>
        Message
        <input disabled={true} value={"hello"} readOnly></input>
      </label>

      <label>
        Signature
        <input
          disabled={true}
          placeholder="Generated signature"
          value={signature}
          readOnly
        ></input>
      </label>

      <input className="button" value="Make signature" onClick={onGenerate} />
    </div>
  );
}

import { Fragment } from "react";
import server from "./server";

export default function KeyGen({ keys, setKeys }) {
  function onGenerate(evt) {
    console.log(`Generate key ${evt}`);
    setKeys([...keys, { public: "public", private: "private" }]);
  }

  function onClear(evt) {
    console.log(`Clear key ${evt}`);
    setKeys([]);
  }

  return (
    <div className="container wallet">
      <h1>Key generator</h1>

      {keys.map((key) => (
        <div id={key.public} className="bordered">
          <label>
            Public Key
            <input
              disabled={true}
              placeholder="Publicly available key"
              value={key.public}
              readOnly
            ></input>
          </label>

          <label>
            Private Key
            <input
              disabled={true}
              placeholder="Private key, store it secretly"
              value={key.private}
              readOnly
            ></input>
          </label>
        </div>
      ))}
      <div>
        <input className="button" value="Generate" onClick={onGenerate} />
        <input
          className="button"
          value="Remove keys"
          onClick={onClear}
        />
      </div>
    </div>
  );
}

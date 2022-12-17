import { Fragment } from "react";
import server from "./server";
import { randomPrivateKey, publicKey } from "./utils";

export default function KeyGen({ keys, setKeys }) {
  function onGenerate(_) {
    const privateKey = randomPrivateKey();
    const publicKey = publicKey(privateKey);

    setKeys([...keys, { public: publicKey, private: privateKey }]);
  }

  function onClear(_) {
    setKeys([]);
  }

  return (
    <div className="container wallet">
      <h2>Key generator</h2>

      {keys.length === 0 && <a className="info">No keys generated</a>}

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
        <input className="button" value="Remove keys" onClick={onClear} />
      </div>
    </div>
  );
}

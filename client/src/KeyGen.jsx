import { randomPrivateKey, getPublicKey, getEthAddress } from "./utils";

export default function KeyGen({ keys, setKeys }) {
  function onGenerate(_) {
    const privateKey = randomPrivateKey();
    const publicKey = getPublicKey(privateKey);
    const ethAddress = getEthAddress(publicKey);

    setKeys([...keys, { public: publicKey, private: privateKey, address: ethAddress }]);
  }

  function onClear(_) {
    setKeys([]);
  }

  return (
    <div className="container wallet">
      <h2>ECDSA Key generator</h2>

      {keys.length === 0 && <a className="info">No keys generated</a>}

      {keys.map((key) => (
        <div key={key.public} className="bordered">
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

          <label>
            Address
            <input
              disabled={true}
              placeholder="Wallet address"
              value={key.address}
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

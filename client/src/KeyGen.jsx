import server from "./server";

export default function KeyGen({ keys, setKeys }) {
  function onGenerate(evt) {
    console.log(`Generate key ${evt}`);
  }

  function onClear(evt) {
    console.log(`Clear key ${evt}`);
  }

  return (
    <div className="container wallet">
      <h1>Key generator</h1>

      <label>
        Public Key
        <input
          disabled={true}
          placeholder="Publicly available key"
          value={keys.public}
          readOnly
        ></input>
      </label>

      <label>
        Private Key
        <input
          disabled={true}
          placeholder="Private key, store it secretly"
          value={keys.private}
          readOnly
        ></input>
      </label>

      <div>
        <input className="button" value="Generate" onClick={onGenerate} />
        <input
          className="button"
          value="Remove current keys"
          onClick={onClear}
        />
      </div>
    </div>
  );
}

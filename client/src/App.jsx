import Wallet from "./Wallet";
import Transfer from "./Transfer";
import KeyGen from "./KeyGen";
import "./App.scss";
import { useState } from "react";
import Signature from "./Signature";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [keys, setKeys] = useState([]);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
      <KeyGen keys={keys} setKeys={setKeys} />
      <Signature keys={keys} />
    </div>
  );
}

export default App;

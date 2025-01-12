import Wallet from "./Wallet";
import KeyGen from "./KeyGen";
import "./App.scss";
import { useState } from "react";
import Signature from "./Signature";
import Faucet from "./Faucet";
import TransferWithSignature from "./TransferWithSignature";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [keys, setKeys] = useState([]);

  return (
    <div className="app">
      <div className="inline">  
        <h1 className="info">Online components</h1>
      </div>

      <div className="inline">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
        />
        <Faucet address={address} setBalance={setBalance} />
        <TransferWithSignature setBalance={setBalance} address={address} />
        </div>

      <div className="inline">
        <h1 className="info">Offline components</h1>
      </div>

      <div className="inline">
        <KeyGen keys={keys} setKeys={setKeys} />
        <Signature keys={keys} />
      </div>
    </div>
  );
}

export default App;

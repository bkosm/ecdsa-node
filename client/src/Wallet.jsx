import server from "./server";
import { useState } from "react";

// function that validates a string is hexadecimal
function isAddressValid(address) {
  return /^[0-9a-fA-F]*$/.test(address);
}

function Wallet({ address, setAddress, balance, setBalance }) {
  const [hasError, setHasError] = useState(false);

  async function onChange(evt) {
    const address = evt.target.value;

    if (!isAddressValid(address)) {
      setBalance(0);
      setHasError(true);
      return;
    }

    setHasError(false);
    setAddress(address);

    if (address.length) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    }
  }

  return (
    <div className="container wallet">
      <h2>Your Wallet</h2>

      <label>
        Wallet Address
        <input
          className={hasError ? "error" : ""}
          placeholder="Type a valid address, e.g: 1af3d2..."
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

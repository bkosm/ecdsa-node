import server from "./server";

export default function Faucet({ address, setBalance }) {
  async function onClick(evt) {
    if (address) {
      console.log('faucet grant')
      const {
        data: { balance },
      } = await server.post(`faucet/${address}`);
      setBalance(balance);
    }
  }

  return (
    <div className="container wallet narrow">
      <h2>Coin faucet</h2>

      <input className="button" value="Grant 10 coins" onClick={onClick} />
    </div>
  );
}

'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/live")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div style={{color:"white"}}>Loading...</div>;

  return (
    <div style={{ background:"#000", color:"#0f0", padding:"20px", minHeight:"100vh" }}>
      <h1>Gensyn Sale Dashboard</h1>

      <p>Clearing Price: ${data.clearing_price}</p>
      <p>Total Wallets: {data.total}</p>
      <p>Cleared: {data.cleared}</p>
      <p>Refunded: {data.refunded}</p>

      <hr />

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Wallet</th>
            <th>Bid Price</th>
            <th>USD</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r:any, i:number) => (
            <tr key={i}>
              <td>{r.bidder.slice(0,6)}...{r.bidder.slice(-4)}</td>
              <td>${r.last_bid_price_usd}</td>
              <td>${r.last_bid_amount_usd.toLocaleString()}</td>
              <td>{r.cancelled_after_usd > 0 ? "REFUNDED" : "CLEARED"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

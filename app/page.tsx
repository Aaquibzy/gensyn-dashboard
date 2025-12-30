"use client";
import { useEffect, useState } from "react";

const CLEARING = 0.0473;

export default function Home() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/live")
      .then(r => r.json())
      .then(setRows);
  }, []);

  const cleared = rows.filter(r => r.last_bid_price_usd >= CLEARING && r.cancelled_after_usd == 0);
  const refunded = rows.filter(r => r.cancelled_after_usd > 0);

  return (
    <div style={{ background:"#050505", minHeight:"100vh", color:"white", padding:40 }}>
      <h1>Gensyn Sale Dashboard</h1>
      <p>Clearing price: ${CLEARING}</p>
      <p>Total wallets: {rows.length}</p>
      <p>Cleared: {cleared.length}</p>
      <p>Refunded: {refunded.length}</p>

      <table>
        <thead>
          <tr><th>Wallet</th><th>Price</th><th>USD</th><th>Status</th></tr>
        </thead>
        <tbody>
          {rows.slice(0,50).map(w=>(
            <tr key={w.bidder}>
              <td>{w.bidder.slice(0,6)}…</td>
              <td>{w.last_bid_price_usd}</td>
              <td>{w.current_commit_usd}</td>
              <td>{w.cancelled_after_usd > 0 ? "REFUNDED" : "CLEARED"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

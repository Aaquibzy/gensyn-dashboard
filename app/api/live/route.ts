import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.dune.com/api/v1/execution/01KD28FKGBD2WQ5VGA9W0M749J/results",
    {
      headers: {
        "X-Dune-API-Key": process.env.DUNE_KEY!
      },
      cache: "no-store"
    }
  );

  const json = await res.json();
  return NextResponse.json(json.result.rows);
}

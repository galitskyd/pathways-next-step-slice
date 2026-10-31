import { createAppServer } from "../src/server.js";

const server = createAppServer();
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const plan = await fetch(`${base}/api/plan`).then((response) => response.json());
console.log("Recommended next step:", plan.recommendation.title);
console.log("Grounded source:", plan.recommendation.source);
console.log("Unknowns routed to advisor:", plan.unknowns.length);

const safe = await fetch(`${base}/api/explain`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ programIds: ["PRG-02", "PRG-01"] })
});
console.log("Safe model request:", safe.status, (await safe.json()).model);

const blocked = await fetch(`${base}/api/explain`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ programIds: ["PRG-02"], name: "Dani", age: 17, note: "private" })
});
console.log("Personal-data request blocked:", blocked.status, await blocked.json());

await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));

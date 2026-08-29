export function colonyHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Colony-Secret": process.env.COLONY_SHARED_SECRET ?? "",
  };
}

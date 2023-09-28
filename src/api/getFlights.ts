export async function getFlightsData() {
  const res = await fetch("http://localhost:3001/flights");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

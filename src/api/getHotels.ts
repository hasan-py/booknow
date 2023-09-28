export async function getHotelsData() {
  const res = await fetch("http://localhost:3001/hotels");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

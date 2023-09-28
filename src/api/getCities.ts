export async function getCitiesData() {
  const res = await fetch("http://localhost:3001/cities");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getYearData(year: string) {
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/tournaments.json`);
  return await response.json();
}

export default getYearData;
export { getYearData };

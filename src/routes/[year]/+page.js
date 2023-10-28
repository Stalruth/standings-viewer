export async function load({ fetch, params }) {
  const yearTournaments = await fetch(`https://api.standings.stalruth.dev/${params.year}/tournaments.json`);
  return {
    year: params.year,
    yearTournaments: await yearTournaments.json()
  };
}

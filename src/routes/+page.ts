export async function load({ fetch }) {
  const currentYearTournaments = await fetch(`https://api.standings.stalruth.dev/2024/tournaments.json`);
  return {
    currentYearTournaments: await currentYearTournaments.json()
  };
}

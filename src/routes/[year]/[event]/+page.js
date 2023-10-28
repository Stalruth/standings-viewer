export async function load({ fetch, params }) {
  const tournamentInfo = await fetch(`https://api.standings.stalruth.dev/${params.year}/${params.event}/tournament.json`);
  return {
    year: params.year,
    eventId: params.event,
    tournamentInfo: await tournamentInfo.json()
  };
}

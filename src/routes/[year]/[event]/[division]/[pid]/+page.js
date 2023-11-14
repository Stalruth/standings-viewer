export async function load({ fetch, params }) {
  const tournamentInfo = await fetch(`https://api.standings.stalruth.dev/${params.year}/${params.event}/tournament.json`);
  const playerInfo = await fetch(`https://api.standings.stalruth.dev/${params.year}/${params.event}/${params.division.toLowerCase()}/players/${params.pid}.json`);
  return {
    year: params.year,
    eventId: params.event,
    division: params.division,
    tournamentInfo: await tournamentInfo.json(),
    player: await playerInfo.json()
  };
}

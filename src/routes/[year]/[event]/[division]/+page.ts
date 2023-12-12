import { getTournamentInfo, getTournamentStandings, getTopCut } from '$lib/getData.js';

export async function load({ fetch, params }) {
  const tournamentInfo = await getTournamentInfo(params.year, params.event, fetch);
  const standings = await getTournamentStandings(params.year, params.event, params.division, fetch);
  const topCut = await getTopCut(params.year, params.event, params.division, fetch);
  return {
    year: params.year,
    eventId: params.event,
    division: params.division,
    tournamentInfo: await tournamentInfo,
    standings: standings,
    topCut: topCut
  };
}

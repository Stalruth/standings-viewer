import { getTournamentInfo } from '$lib/getData.js';

export async function load({ fetch, params }) {
  const tournamentInfo = await getTournamentInfo(params.year, params.event, fetch);
  return {
    year: params.year,
    eventId: params.event,
    tournamentInfo: await tournamentInfo
  };
}

import { getTournamentInfo, getPlayerInfo } from '$lib/getData.js';

export async function load({ fetch, params }) {
  const tournamentInfo = await getTournamentInfo(params.year, params.event, fetch);
  const playerInfo = await getPlayerInfo(params.year, params.event, params.division, params.pid, fetch);
  return {
    year: params.year,
    eventId: params.event,
    division: params.division,
    tournamentInfo: await tournamentInfo,
    player: await playerInfo
  };
}

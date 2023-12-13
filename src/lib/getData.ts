 async function getTournamentInfo(year: string, eventId: string, fetch: Function) {
  if(!fetch) {
    fetch = window.fetch;
  }
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/tournament.json`);
  return await response.json();
}

async function getTournamentStandings(year: string, eventId: string, division: 'juniors' | 'seniors' | 'masters', fetch: Function) {
  if(!fetch) {
    fetch = window.fetch;
  }
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/${division.toLowerCase()}/standings.json`);
  return await response.json();
}

async function getTopCut(year: string, eventId: string, division: 'juniors' | 'seniors' | 'masters', fetch: Function) {
  if(!fetch) {
    fetch = window.fetch;
  }
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/${division.toLowerCase()}/top-cut.json`);
  if(response.ok) {
    return await response.json();
  } else {
    return null;
  }
}

async function getPlayerInfo(year: string, eventId: string, division: 'juniors' | 'seniors' | 'masters', player: Number, fetch: Function) {
  if(!fetch) {
    fetch = window.fetch;
  }
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/${division.toLowerCase()}/players/${player}.json`);
  return await response.json();
}

export { getTournamentInfo, getTournamentStandings, getTopCut, getPlayerInfo }

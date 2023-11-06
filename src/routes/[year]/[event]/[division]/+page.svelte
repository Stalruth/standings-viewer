<script lang="ts">
import { onMount } from 'svelte';

export let data;
const year = data.year;
const eventId = data.eventId;
const division = data.division;
const tournamentInfo = data.tournamentInfo;

async function getTournamentStandings(year: string, eventId: string, division: 'juniors' | 'seniors' | 'masters') {
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/${division.toLowerCase()}/standings.json`);
  return await response.json();
}

async function getTournamentInfo(year: string, eventId: string) {
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/tournament.json`);
  return await response.json();
}

let standings = [];

$: lastUpdated = new Date(tournamentInfo.lastUpdated);

onMount(async () => {
  standings = await getTournamentStandings(year, eventId, division);
});

const playerIsExpanded = {};

function openDialog(e) {
  e.target.parentNode.nextElementSibling.showModal();
}

function closeDialog(e) {
  e.target.parentNode.close();
}

function getResult(result) {
  if (result === 'W') {
    return 'Win';
  } else if (result === 'L') {
    return 'Loss';
  } else if (result === 'T') {
    return 'Tie';
  }
  return 'Ongoing';
}

</script>

<svelte:head>
  <link rel="preload" href={`https://api.standings.stalruth.dev/${year}/${eventId}/${division.toLowerCase()}/standings.json`} as="fetch" crossorigin />
  <title>{tournamentInfo.name} - {division[0].toUpperCase()}{division.substring(1)} Division Homemade Standings</title>
  <meta property="og:title" content="{tournamentInfo.name} Homemade Standings" />
  <meta property="og:url" content="https://standings.stalruth.dev/" />
  <meta property="og:description" content="Homemade standings for the {tournamentInfo.name}." />
</svelte:head>

<h1>{tournamentInfo.name}</h1>

<p>This page is a best-effort attempt to calculate the standings with only publicly available data, and may contain errors.</p>

<details>
  <summary>Links</summary>
  <ul>
    <li><a href={`https://rk9.gg/roster/${tournamentInfo.rk9link}`}>RK9 Roster</a></li>
    <li><a href={`https://rk9.gg/pairings/${tournamentInfo.rk9link}`}>RK9 Pairings</a></li>
    <li><a href={`https://api.standings.stalruth.dev/${year}/${eventId}/${division}/standings.json`}>Unofficial JSON standings</a></li>
  </ul>
</details>

<p>There are {tournamentInfo.players?.[division] ?? 'a couple'} players competing in this tournament. This page was last updated at {lastUpdated.toLocaleString()}.</p>

<table class="standings">
  <thead>
    <tr>
      <th><span class="resistance">Rank</span></th>
      <th>Name</th>
      <th>Record</th>
      <th class="resistance">Resistance</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each standings as player}
      <tr class="player">
        <td>{player.placing}</td>
        <td class="name">{player.name}</td>
        <td>
          {player.record.wins}-{player.record.losses}-{player.record.ties}
        </td>
        <td class="resistance">
          {(player.resistances.opp * 100).toFixed(2)}%
          <span class="oppopp">({(player.resistances.oppopp * 100).toFixed(2)}%)</span>
        </td>
        <td class="schedule-button">
          <button on:click={openDialog} data-player={player.placing}>{!!playerIsExpanded[player.placing] ? 'Hide' : 'Show'} More</button>
        </td>
        <dialog class="schedule">
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Result</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {#each Object.keys(player.rounds).reverse() as round}
              <tr>
                <td>{round}</td>
                <td>{getResult(player.rounds[round].result)}</td>
                <td class="name">{player.rounds[round].name}</td>
              </tr>
            {/each}
            </tbody>
          </table>
          <button on:click={closeDialog}>Close</button>
        </dialog>
      </tr>
    {/each}
  </tbody>
</table>

<style>
.standings {
  width: 100%;
}

.oppopp {
  font-size: 0.85em;
}

.schedule-button button {
  padding: 0.25em;
  margin: 0;
}

dialog[open] {
  display: flex;
}

dialog {
  flex-direction: column;
}

dialog table thead {
  top: calc(-1rem - 5px);
}

@media (max-width: 50rem) {
  .name {
    max-width: 12em;
    white-space: break-spaces;
  }

  .resistance {
    display: none;
  }
}
</style>

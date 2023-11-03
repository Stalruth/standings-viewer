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

function toggleExpand(e) {
  playerIsExpanded[e.target.attributes['data-player'].value] = !playerIsExpanded[e.target.attributes['data-player'].value];
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

<div class="standings">
  <div class="label-desktop">Rank</div>
  <div class="label-desktop">Name</div>
  <div class="label-desktop">Record</div>
  <div class="label-desktop">Opp Win%</div>
  <div class="label-desktop">Opp Opp Win%</div>
  <div class="label-desktop"></div>
  {#each standings as player}
  <div class="player">
    <div>{player.placing}</div>
    <div class="name">{player.name}</div>
    <div>
      <div class="label-mobile">Record:</div>
      <div>{player.record.wins}-{player.record.losses}-{player.record.ties}</div>
    </div>
    <div>
      <div class="label-mobile">Opp Win%:</div>
      <div>{(player.resistances.opp * 100).toFixed(2)}%</div>
    </div>
    <div>
      <div class="label-mobile">Opp Opp Win%:</div>
      <div>{(player.resistances.oppopp * 100).toFixed(2)}%</div>
    </div>
    <div class="schedule-button">
      <button on:click={toggleExpand} data-player={player.placing}>{!!playerIsExpanded[player.placing] ? 'Hide' : 'Show'} Run</button>
    </div>
    <div class="schedule" class:expanded={!!playerIsExpanded[player.placing]}>
      <table>
        <thead>
          <tr>
            <td>R#</td>
            <td>Result</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
        {#each Object.keys(player.rounds) as round}
          <tr>
            <td>{round}</td>
            <td>{getResult(player.rounds[round].result)}</td>
            <td>{player.rounds[round].name}</td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>
  </div>
  <hr class="label-mobile">
  {/each}
</div>

<style>
.standings {
  display: grid;
  grid-template-columns: repeat(6, max-content);
  column-gap: 1rem;
  justify-content: space-around;
  align-items: baseline;
}

.player {
  display: contents;
}

.schedule-button {
  display: block;
  justify-content: center;
}

.schedule-button button {
  padding: 0.25rem;
  margin: 0.25rem 0;
}

.schedule {
  grid-column: 1 / -1;
  display: none;
}

.expanded.schedule {
  display: flex;
  justify-content: center;
}

.label-desktop {
  display: block;
}

.label-mobile {
  display: none;
}

hr {
  grid-column: 1 / -1;
  margin: 0.5rem 0;
}

@media (max-width: 50rem) {
  .standings {
    grid-template-columns: repeat(3, max-content);
  }

  .name {
    grid-column: 2 / -1;
  }

  .schedule-button {
    grid-column: 1 / -1;
    display: flex;
  }

  .label-desktop {
    display: none;
  }

  .label-mobile {
    display: block;
  }
}
</style>

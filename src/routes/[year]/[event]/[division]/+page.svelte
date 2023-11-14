<script lang="ts">
import { onMount } from 'svelte';

import { getFavouritesStore } from '$lib/favouritesStore.js';
import StandingsTable from './StandingsTable.svelte';

export let data;
let year = data.year;
let eventId = data.eventId;
let division = data.division;
$: year = data.year;
$: eventId = data.eventId;
$: division = data.division;
$: tournamentInfo = data.tournamentInfo;
$: lastUpdated = new Date(tournamentInfo.lastUpdated);

let standings = [];

async function getTournamentStandings(year: string, eventId: string, division: 'juniors' | 'seniors' | 'masters') {
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/${division.toLowerCase()}/standings.json`);
  return await response.json();
}

let favourites = [];
let favouritesStore = getFavouritesStore(year, eventId, division);
$: sortedFavourites = standings.filter(el => favourites.includes(el));

function getFavouriteHandler(player) {
  return function toggleFavourite(e) {
    if (favourites.includes(player)) {
      favourites = favourites.filter(el => el !== player);
    } else {
      favourites = [...favourites, player];
    }
    $favouritesStore = favourites.map(el => el.id);
  }
}

onMount(async () => {
  standings = await getTournamentStandings(year, eventId, division);
  favourites = standings.filter(el => $favouritesStore.includes(el.id));
});
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

<p>There are {tournamentInfo.players?.[division] ?? 'a couple'} players competing in this tournament. This page was last updated at {lastUpdated?.toLocaleString() ?? 'at some point'}.</p>

{#if favourites.length > 0}
  <h2>Favourites</h2>
  <StandingsTable standings={sortedFavourites} getFavouriteHandler={getFavouriteHandler}  favourites={favourites} />
{/if}

<h2>Standings</h2>
<StandingsTable standings={standings} getFavouriteHandler={getFavouriteHandler} favourites={favourites} />

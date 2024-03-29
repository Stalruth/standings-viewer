<script lang="ts">
import { onMount } from 'svelte';

import { getFavouritesStore } from '$lib/favouritesStore.js';
import { getTournamentStandings, getTopCut } from '$lib/getData.js';
import StandingsTable from './StandingsTable.svelte';
import TopCut from './TopCut.svelte';

export let data;
$: year = data.year;
$: eventId = data.eventId;
$: division = data.division;
$: tournamentInfo = data.tournamentInfo;
$: lastUpdated = new Date(tournamentInfo.lastUpdated);
$: topCut = data.topCut;
$: standings = data.standings;

let favourites = [];
$: favouritesStore = getFavouritesStore(year, eventId, division);
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
  favourites = standings.filter(el => $favouritesStore.includes(el.id));
});
</script>

<svelte:head>
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

{#if topCut}
  <details open>
    <summary class="header">
      <h2>Top Cut</h2>
    </summary>
    <TopCut bracket={topCut.rounds} roundCount={topCut.totalRounds} />
  </details>
{/if}

<h2>Standings</h2>
<StandingsTable standings={standings} getFavouriteHandler={getFavouriteHandler} favourites={favourites} />

<style>
summary.header {
  display: block;
}

summary.header h2 {
  display: list-item;
}
</style>

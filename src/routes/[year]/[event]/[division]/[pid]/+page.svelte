<script lang="ts">
import { onMount } from 'svelte';

import { getFavouritesStore } from '$lib/favouritesStore.js';
import PlayerInfo from './PlayerInfo.svelte';

export let data;

$: ({year, eventId, division, tournamentInfo, player} = data);

$: favouritesStore = getFavouritesStore(year, eventId, division);

function getFavouriteHandler(playerId) {
  return function toggleFavourite(e) {
    if ($favouritesStore.includes(playerId)) {
      $favouritesStore = $favouritesStore.filter(el => el !== playerId);
    } else {
      $favouritesStore = [...$favouritesStore, playerId];
    }
  }
}

function decountrify(name) {
  return name.split('[')[0].trim();
}

</script>

<svelte:head>
  <title>Player Details: {decountrify(player.name)} - {tournamentInfo.name} Homemade Standings</title>
  <meta property="og:title" content="Player Details: {decountrify(player.name)} - {tournamentInfo.name} Homemade Standings" />
  <meta property="og:url" content="https://standings.stalruth.dev/" />
  <meta property="og:description" content="Homemade standings for the {tournamentInfo.name}." />
</svelte:head>

<h1>{tournamentInfo.name}</h1>

{#if player}
  <PlayerInfo player={player} playerCount={tournamentInfo.players[division]} tournamentStatus={tournamentInfo.tournamentStatus} favouritesStore={favouritesStore} getFavouriteHandler={getFavouriteHandler} />
{/if}

<style>
</style>

<script lang="ts">
import PlayerInfo from './PlayerInfo.svelte';

export let data;

$: ({year, eventId, division, tournamentInfo, player} = data);
</script>

<svelte:head>
  <title>Player Details: {tournamentInfo.name} - {division[0].toUpperCase()}{division.substring(1)} Division Homemade Standings</title>
  <meta property="og:title" content="Player Info - {tournamentInfo.name} Homemade Standings" />
  <meta property="og:url" content="https://standings.stalruth.dev/" />
  <meta property="og:description" content="Homemade standings for the {tournamentInfo.name}." />
</svelte:head>

<h1>{tournamentInfo.name}</h1>

{#if player}
  <PlayerInfo player={player} playerCount={tournamentInfo.players[division]} tournamentStatus={tournamentInfo.tournamentStatus}/>
{/if}

<style>
</style>

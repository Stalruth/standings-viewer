<script lang="ts">
import { onMount } from 'svelte';

import PlayerEntry from '$lib/components/PlayerEntry.svelte';

export let data;
const year = data.year;
const name = data.name;
const division = data.division;

async function getTournamentStandings(year: string, name: string, division: 'juniors' | 'seniors' | 'masters') {
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${name}/${division.toLowerCase()}/standings.json`);
  return await response.json();
}

let standings = [];

onMount(async () => {
  standings = await getTournamentStandings(year, name, division);
})

</script>

<svelte:head>
  <link rel="preload" href={`https://api.standings.stalruth.dev/${year}/${name}/${division.toLowerCase()}/standings.json`} as="fetch" crossorigin />
</svelte:head>

<h1>{year} {name}</h1>

<div class="standings">
  {#each standings as player}
    <PlayerEntry player={player} />
  {/each}
</div>


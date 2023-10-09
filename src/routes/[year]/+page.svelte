<script lang="ts">
import { onMount } from 'svelte';

import getYearData from '$lib/getYearData.ts';
import TournamentList from '$lib/components/TournamentList.svelte';

export let data;
const year = data.year;

let yearTournaments = [];

onMount(async () => {
  yearTournaments = await getYearData(year);
});

</script>

<svelte:head>
  <link rel="preload" href={`https://api.standings.stalruth.dev/2024/tournaments.json`} as="fetch" crossorigin />
</svelte:head>

<h1>Pokémon VGC 2024 Season Standings</h1>
<TournamentList tournaments={yearTournaments} year={year} />


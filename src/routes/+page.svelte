<script lang="ts">
import { onMount } from 'svelte';

import getYearData from '$lib/getYearData.ts';
import TournamentList from '$lib/components/TournamentList.svelte';

const currentYear = '2024';
let currentYearTournaments = [];

onMount(async () => {
  currentYearTournaments = await getYearData(currentYear);
});

</script>

<svelte:head>
  <link rel="preload" href={`https://api.standings.stalruth.dev/2024/tournaments.json`} as="fetch" crossorigin />
</svelte:head>

<h1>Pokémon VGC Standings</h1>
<h2>VGC2024 Standings</h2>
<TournamentList tournaments={currentYearTournaments} year={currentYear} />


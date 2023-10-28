<script lang="ts">

import getYearData from '$lib/getYearData.ts';
import TournamentList from '$lib/components/TournamentList.svelte';

export let data;

let currentYearTournaments = data.currentYearTournaments;

</script>

<svelte:head>
  <title>VGC Homemade Standings Index</title>
  <meta property="og:title" content="VGC Homemade Standings Index" />
  <meta property="og:url" content="https://standings.stalruth.dev/" />
  <meta property="og:description" content="Homemade standings for VGC tournaments." />
</svelte:head>

<h1>Pokémon VGC Standings</h1>
<h2>VGC2024 Standings</h2>
<TournamentList tournaments={currentYearTournaments} year={2024} />


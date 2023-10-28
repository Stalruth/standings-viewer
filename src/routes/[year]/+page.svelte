<script lang="ts">
import { onMount } from 'svelte';

import getYearData from '$lib/getYearData.ts';
import TournamentList from '$lib/components/TournamentList.svelte';

export let data;
const year = data.year;
const yearTournaments = data.yearTournaments;

</script>

<svelte:head>
  <title>VGC {year} Homemade Standings Index</title>
  <meta property="og:title" content="VGC {year} Homemade Standings Index" />
  <meta property="og:url" content="https://standings.stalruth.dev/" />
  <meta property="og:description" content="Homemade standings for VGC {year} tournaments." />
</svelte:head>

<h1>Pokémon VGC 2024 Season Standings</h1>
<TournamentList tournaments={yearTournaments} year={year} />


<script lang="ts">
import { onMount } from 'svelte';

export let data;
const year = data.year;
const eventId = data.eventId;

async function getTournamentInfo(year: string, eventId: string) {
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/tournament.json`);
  return await response.json();
}

let tournamentInfo = {"name": `${year} ${eventId}`};

onMount(async () => {
  tournamentInfo = await getTournamentInfo(year, eventId);
});

</script>

<svelte:head>
  <link rel="preload" href={`https://api.standings.stalruth.dev/${year}/${eventId}/tournament.json`} as="fetch" crossorigin />
</svelte:head>

<h1>{tournamentInfo.name}</h1>

<ul>
  <li>
    <a href={`/${year}/${eventId}/juniors`}>Juniors ({tournamentInfo?.players?.['juniors'] ?? 'a couple'} players)</a>
  </li>
  <li>
    <a href={`/${year}/${eventId}/seniors`}>Seniors ({tournamentInfo?.players?.['seniors'] ?? 'a few'} players)</a>
  </li>
  <li>
    <a href={`/${year}/${eventId}/masters`}>Masters ({tournamentInfo?.players?.['masters'] ?? 'a lot of'} players)</a>
  </li>
</ul>

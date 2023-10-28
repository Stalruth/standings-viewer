<script lang="ts">
export let data;
const year = data.year;
const eventId = data.eventId;
const tournamentInfo = data.tournamentInfo;

async function getTournamentInfo(year: string, eventId: string) {
  const response = await fetch(`https://api.standings.stalruth.dev/${year}/${eventId}/tournament.json`);
  return await response.json();
}

</script>

<svelte:head>
  <title>Select Division: {tournamentInfo.name} Homemade Standings</title>
  <meta property="og:title" content="Select Division: {tournamentInfo.name} Homemade Standings" />
  <meta property="og:url" content="https://standings.stalruth.dev/" />
  <meta property="og:description" content="Homemade standings for the {tournamentInfo.name}." />
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

<script lang="ts">
export let data;
const year = data.year;
const eventId = data.eventId;
const tournamentInfo = data.tournamentInfo;
const showWinners = tournamentInfo?.winners?.juniors || tournamentInfo?.winners?.seniors || tournamentInfo?.winners?.masters;
</script>

<svelte:head>
  <title>Select Division: {tournamentInfo.name} Homemade Standings</title>
  <meta property="og:title" content="Select Division: {tournamentInfo.name} Homemade Standings" />
  <meta property="og:url" content="https://standings.stalruth.dev/" />
  <meta property="og:description" content="Homemade standings for the {tournamentInfo.name}." />
</svelte:head>

<h1>{tournamentInfo.name}</h1>

<div class="container">
  <table>
    <thead>
      <tr>
        <th>Division</th>
        <th>Players</th>
        {#if showWinners}
          <th>Winner</th>
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each ['Juniors', 'Seniors', 'Masters'] as division}
        <tr>
          <td>
            <a href={`/${year}/${eventId}/${division.toLowerCase()}`}>{division}</a>
          </td>
          <td>{tournamentInfo?.players?.[division.toLowerCase()]}</td>
          {#if showWinners}
            <td>{tournamentInfo?.winners?.[division.toLowerCase()] ?? 'Ongoing'}</td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
.container {
  display: flex;
  justify-content: center;
}

table {
  font-size: inherit;
}
</style>

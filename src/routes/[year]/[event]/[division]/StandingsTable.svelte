<script lang="ts">
import { Icons } from '@pkmn/img';

import getTeamDisplay from '$lib/getTeamDisplay.ts';

export let standings = [];
export let getFavouriteHandler = (favourite) => {return (e) => {}};
export let favourites = [];

$: hasTeams = standings.filter(el => !!el.team).length > 0;
</script>

<table class="standings">
  <thead>
    <tr>
      <th><span class="rank-label">Rank</span></th>
      <th>Favourite</th>
      <th class="name">Name</th>
      {#if hasTeams}
        <th class="team-cell">Team</th>
      {/if}
      <th>Record</th>
      <th class="resistance">Resistance</th>
    </tr>
  </thead>
  <tbody>
    {#each standings as player}
      <tr class="player">
        <td>{player.placing}</td>
        <td class="fave">
          <button on:click={getFavouriteHandler(player)}>
            {#if favourites.includes(player)}
              <span class="faved">★</span>
            {:else}
              ☆
            {/if}
          </button>
        </td>
        <td class="name">
          <a href={`${document.URL}/${player.id}`}>{player.name}</a>
        </td>
        {#if hasTeams}
          <td class="team-cell">
            {#each getTeamDisplay(player.team) as set}
              <span
                title={set.species ?? 'No Data'}
                style={Icons.getPokemon(set.species ?? 'No Data').style}
              >
              </span>
            {/each}
          </td>
        {/if}
        <td>
          {player.record.wins}-{player.record.losses}
          {#if player.record.ties !== 0}
            -{player.record.ties}
          {/if}
        </td>
        <td class="resistance">
          {(player.resistances.opp * 100).toFixed(2)}%
          <span class="oppopp">({(player.resistances.oppopp * 100).toFixed(2)}%)</span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
.standings {
  width: 100%;
  margin-bottom: 1rem;
}

.oppopp {
  font-size: 0.85em;
}

.fave {
  padding: 0;
}

.fave button {
  padding: 0 2rem;
  background: none;
  color: inherit;
  border: 0;
  margin: 0;
  font-size: 1.375rem;
}

.faved {
  color: #d06f00;
}

.name {
  max-width: 12em;
  white-space: normal;
}

@media (max-width: 50rem) {
  .resistance, .rank-label, .team-cell {
    display: none;
  }
}
</style>

<script lang="ts">
import { Icons } from '@pkmn/img';

import TeamDisplay from '$lib/components/TeamDisplay.svelte';

export let standings = [];
export let getFavouriteHandler = (favourite) => {return (e) => {}};
export let favourites = [];

$: hasTeams = standings.filter(el => !!el.team).length > 0;
</script>

<table class="standings">
  <thead>
    <tr>
      <th><span class="rank-label">Rank</span></th>
      <th>
        <span class="label-desktop">Favourite</span>
        <span class="label-mobile">Fave</span>
      </th>
      <th class="name">
        Name
        {#if hasTeams}
          <span class="label-mobile">
            / Team
          </span>
        {/if}
      </th>
      {#if hasTeams}
        <th class="team-cell">Team</th>
      {/if}
      <th class="record">Record</th>
      <th class="resistance">Resistance</th>
    </tr>
  </thead>
  <tbody>
    {#each standings as player}
      <tr class="player" class:dq={player.placing == 9999}>
        <td>
          {#if player.placing === 9999}
            DQ
          {:else}
            {player.placing}
          {/if}
        </td>
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
          <p>
            <a href={`${document.URL}/${player.id}`}>{player.name}</a>
          </p>
          {#if hasTeams}
            <p class="inline-team">
              <TeamDisplay team={player.team} />
            </p>
          {/if}
        </td>
        {#if hasTeams}
          <td class="team-cell">
            <TeamDisplay team={player.team} />
          </td>
        {/if}
        <td class="record">
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
td p {
  margin: 0;
}

.label-mobile, .inline-team {
  display: none;
}

.label-desktop {
  display: inline;
}

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
  padding: 0 1rem;
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

.dq .name a {
  text-decoration: line-through underline;
}

.dq .record, .dq .resistance {
  text-decoration: line-through;
}

@media (max-width: 52.5rem) {
  .label-mobile {
    display: inline;
  }

  .label-desktop {
    display: none;
  }

  .inline-team {
    display: inline-grid;
    grid-template-columns: repeat(6, min-content);
    justify-content: center;
  }

  .team-cell {
    display: none;
  }
}

@media (max-width: 40rem) {
  .resistance {
    display: none;
  }
}

@media (max-width: 35rem) {
  .inline-team {
    grid-template-columns: repeat(3, min-content);
  }
}
</style>

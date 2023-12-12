<script lang="ts">
import { Icons } from '@pkmn/img';

import { page } from '$app/stores';
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
            <a href={`${$page.url}/${player.id}`}>{player.name}</a>
          </p>
          {#if hasTeams && player.team}
            <p class="inline-team">
              <TeamDisplay player={player} />
            </p>
          {/if}
        </td>
        {#if hasTeams && player.team}
          <td class="team-cell">
            <TeamDisplay player={player} />
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

.inline-team {
  display: none;
}

.standings {
  width: 100%;
  margin-bottom: 1rem;
}

.oppopp {
  font-size: 0.85em;
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
  .inline-team {
    display: block;
  }

  .inline-team :global(a) {
    display: inline-grid;
    grid-template-columns: repeat(7, min-content);
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
  .inline-team :global(a) {
    grid-template-columns: repeat(4, min-content);
  }

  .inline-team :global(a :last-child) {
    grid-column: 4;
    grid-row: 1/3;
  }
}
</style>

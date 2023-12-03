 <script lang="ts">
import { Icons } from '@pkmn/img';

import TeamDisplay from '$lib/components/TeamDisplay.svelte';
import getTeamDisplay from '$lib/getTeamDisplay.ts';

export let player = {};
export let roundStructure = {};
export let favouritesStore: any = undefined;
export let getFavouriteHandler = (favourite) => {return (e) => {}};

function getMatchResult(result) {
  if (result === 'W') {
    return 'Win';
  } else if (result === 'L') {
    return 'Loss';
  } else if (result === 'T') {
    return 'Tie';
  }
  return 'Ongoing';
}

function getPlacingName(top) {
  if (top === 1) {
    return '1st';
  } else if (top === 2) {
    return '2nd';
  }
  return `Top ${top}`;
}

function getTournamentStages(rounds, roundStructure) {
  console.log(roundStructure);
  const stages = [
    {
      name: roundStructure.swissDay2 === 0 ? 'Swiss' : 'Day One Swiss',
      rounds: []
    }
  ];

  if (roundStructure.swissDay2 > 0) {
    stages.push({
      name: 'Day Two Swiss',
      rounds: []
    });
  }

  if (roundStructure.topCut > 0) {
    stages.push({
      name: 'Top Cut',
      rounds: []
    })
  }

  for (let i in rounds) {
    if (Number(i) < roundStructure.swissDay1) {
      stages[0].rounds.push({round: Number(i)+1, ...rounds[i]});
    } else if (Number(i) < roundStructure.swissDay1 + roundStructure.swissDay2) {
      stages[1].rounds.push({round: Number(i)+1, ...rounds[i]});
    } else {
      console.log(Number(i), roundStructure.swissDay1 + roundStructure.swissDay2 + roundStructure.topCut)
      let roundName = 'Top 8';
      if (Number(i) === roundStructure.swissDay1 + roundStructure.swissDay2 + roundStructure.topCut - 1) {
        roundName = 'Finals';
      } else if (Number(i) === roundStructure.swissDay1 + roundStructure.swissDay2 + roundStructure.topCut - 2) {
        roundName = 'Top 4';
      }
      stages[stages.length - 1].rounds.push({
        round: roundName,
        ...rounds[i]
      });
    }
  }

  return stages.filter(el => el.rounds.length > 0);
}
</script>

<div class="player">
  <h2>
    {player.name}
  </h2>

  <h3>
    Record
  </h3>

  {#if player.top}
    <p>Final placing: {getPlacingName(player.top)}</p>
  {/if}

  <p>Record:
    {#if player.record.ties === 0}
      {player.record.wins}-{player.record.losses}
    {:else}
      {player.record.wins}-{player.record.losses}-{player.record.ties}
    {/if}
  </p>

  <p>Resistance: {(100 * player.resistances.opp).toFixed(2)}% <span class="oppopp">({(100 * player.resistances.oppopp).toFixed(2)}%)</span></p>

  {#if player.team || player.paste}
    <h3>
      Team
    </h3>

    {#if player.team}
      <p class="team-display">
        <TeamDisplay player={player} />
      </p>
    {/if}
  {/if}

  <h3>
    Schedule
  </h3>

  {#each getTournamentStages(player.rounds, roundStructure).reverse() as stage, i}
    <table>
      <caption>
        {stage.name}
      </caption>
      <thead>
        <tr>
          <th class="round">Round</th>
          <th>Result</th>
          <th>
            <span class="label-mobile">Fave</span>
            <span class="label-desktop">Favourite</span>
          </th>
          <th>
            Name
            {#if stage.rounds.filter(el => el.team).length}
              <span class="label-mobile">/ Team</span>
            {/if}
          </th>
          {#if stage.rounds.filter(el => el.team).length}
            <th class="team-cell">Team</th>
          {/if}
          <th>Record</th>
        </tr>
      </thead>
      <tbody>
      {#if i === 0 && player.drop != -1}
      <tr>
        <td colspan="9">Dropped at Round {player.drop}</td>
      </tr>
      {/if}
      {#each stage.rounds.reverse() as round}
        <tr>
          <td class="round">{round.round}</td>
          <td>{getMatchResult(round.result)}</td>
          <td class="fave">
            <button on:click={getFavouriteHandler(round.id)}>
              {#if $favouritesStore.includes(round.id)}
                <span class="faved">★</span>
              {:else}
                ☆
              {/if}
            </button>
          </td>
          <td class="name">
            {#if round.id === 0}
              <b>{round.name}</b>
            {:else}
              <p>
                <a href="{round.id}">{round.name}</a>
              </p>
              {#if round.team}
                <p class="inline-team">
                  <TeamDisplay player={round} />
                </p>
              {/if}
            {/if}
          </td>
          {#if stage.rounds.filter(el => el.team).length}
            <td class="team-cell">
              {#if round.team}
                <TeamDisplay player={round} />
              {/if}
            </td>
          {/if}
          <td>
            {#if round.record}
              {round.record.wins}-{round.record.losses}{round.record.ties != 0 ? `-${round.record.ties}` : ''}
            {/if}
          </td>
        </tr>
      {/each}
      </tbody>
    </table>
  {/each}
</div>

<style>
h2 {
  margin: 0;
}

p.team-display {
  width: max-content;
}

table {
  margin-bottom: 1rem;
  width: 100%;
}

td p {
  margin: 0;
}

.inline-team {
  display: none;
}

.player {
  border-radius: 7px;
}

.oppopp {
  font-size: 0.85em;
}

.name {
  white-space: normal;
}

@media (max-width: 52.5rem) {
  .team-cell, .round {
    display: none;
  }

  .inline-team {
    display: block;
  }

  .inline-team :global(a) {
    display: inline-grid;
    grid-template-columns: repeat(7, min-content);
    justify-content: center;
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

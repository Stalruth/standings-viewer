 <script lang="ts">
import { Icons } from '@pkmn/img';

import TeamDisplay from '$lib/components/TeamDisplay.svelte';
import getTeamDisplay from '$lib/getTeamDisplay.ts';

export let player = {};
export let playerCount = 0;
export let tournamentStatus = '';

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

function getPlacingName(position, playerCount) {
  if (position === 1) {
    return '1st';
  } else if (position === 2) {
    return '2nd';
  } else if (position <= 4) {
    return 'Top 4';
  } else if (position <= 8) {
    return 'Top 8';
  } else if (position <= 16 && playerCount >= 48) {
    return 'Top 16';
  } else if (position <= 32 && playerCount >= 80) {
    return 'Top 32';
  } else if (position <= 64 && playerCount >= 128) {
    return 'Top 64';
  } else if (position <= 128 && playerCount >= 256) {
    return 'Top 128';
  } else if (position <= 256 && playerCount >= 512) {
    return 'Top 256';
  } else if (position <= 512 && playerCount >= 1024) {
    return 'Top 512';
  } else if (position <= 1024 && playerCount >= 2048) {
    return 'Top 1024';
  }
  return '';
}

function getTournamentStages(rounds, playerCount) {
  const roundCounts = {
    dayOne: 3,
    dayTwo: 0,
    topCut: 0
  };

  if (playerCount >= 800) {
    roundCounts.dayOne = 9;
    roundCounts.dayTwo = 6;
    roundCounts.topCut = 3;
  } else if (playerCount >= 227) {
    roundCounts.dayOne = 9;
    roundCounts.dayTwo = 5;
    roundCounts.topCut = 3;
  } else if (playerCount >= 129) {
    roundCounts.dayOne = 8;
    roundCounts.dayTwo = 0;
    roundCounts.topCut = 3;
  } else if (playerCount >= 65) {
    roundCounts.dayOne = 7;
    roundCounts.dayTwo = 0;
    roundCounts.topCut = 3;
  } else if (playerCount >= 33) {
    roundCounts.dayOne = 6;
    roundCounts.dayTwo = 0;
    roundCounts.topCut = 3;
  } else if (playerCount >= 21) {
    roundCounts.dayOne = 5;
    roundCounts.dayTwo = 0;
    roundCounts.topCut = 3;
  } else if (playerCount >= 13) {
    roundCounts.dayOne = 5;
    roundCounts.dayTwo = 0;
    roundCounts.topCut = 2;
  } else if (playerCount >= 9) {
    roundCounts.dayOne = 4;
    roundCounts.dayTwo = 0;
    roundCounts.topCut = 2;
  }

  const stages = [
    {
      name: roundCounts.dayTwo === 0 ? 'Swiss' : 'Day One Swiss',
      rounds: []
    }
  ];

  if (roundCounts.dayTwo > 0) {
    stages.push({
      name: 'Day Two Swiss',
      rounds: []
    });
  }

  if (roundCounts.topCut > 0) {
    stages.push({
      name: 'Top Cut',
      rounds: []
    })
  }

  for (let i of Object.keys(rounds)) {
    if (Number(i) <= roundCounts.dayOne) {
      stages[0].rounds.push({round: i, ...rounds[i]});
    } else if (Number(i) <= roundCounts.dayOne + roundCounts.dayTwo) {
      stages[1].rounds.push({round: i, ...rounds[i]});
    } else {
      let roundName = 'Top 8';
      if (i === `${roundCounts.dayOne + roundCounts.dayTwo + roundCounts.topCut}`) {
        roundName = 'Finals';
      } else if (i === `${roundCounts.dayOne + roundCounts.dayTwo + roundCounts.topCut - 1}`) {
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

  {#if tournamentStatus === 'finished' && getPlacingName(player.placing, playerCount)}
    <p>Final placing: {getPlacingName(player.placing, playerCount)}</p>
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
      <p>
        {#if player.paste}
          <a href={player.paste}>
            <TeamDisplay team={player.team} />
            (Paste)
          </a>
        {:else}
          <TeamDisplay team={player.team} />
        {/if}
      </p>
    {/if}
  {/if}

  <h3>
    Schedule
  </h3>

  {#each getTournamentStages(player.rounds, playerCount).reverse() as stage, i}
    <table>
      <caption>
        {stage.name}
      </caption>
      <thead>
        <tr>
          <th>Round</th>
          <th>Result</th>
          <th>
            Name
            {#if stage.rounds.filter(el => el.team).length}
              <span class="label-mobile">/ Team</span>
            {/if}
          </th>
          {#if stage.rounds.filter(el => el.team).length}
            <th class="team">Team</th>
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
          <td>{round.round}</td>
          <td>{getMatchResult(round.result)}</td>
          <td class="name">
            {#if round.id === 0}
              <b>{round.name}</b>
            {:else}
              <p>
                <a href="{round.id}">{round.name}</a>
              </p>
              {#if round.team}
                <p class="inline-team">
                  <TeamDisplay team={round.team} />
                </p>
              {/if}
            {/if}
          </td>
          {#if stage.rounds.filter(el => el.team).length}
            <td class="team">
              {#if round.team}
                {#each getTeamDisplay(round.team) as set}
                  <span
                    title={set ?? 'No Data'}
                    style={Icons.getPokemon(set ?? 'No Data').style}
                  >
                  </span>
                {/each}
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

table {
  margin-bottom: 1rem;
  width: 100%;
}

td p {
  margin: 0;
}

.label-mobile, .inline-team {
  display: none;
}

.player {
  border-radius: 7px;
}

.oppopp {
  font-size: 0.85em;
}

@media (max-width: 52.5rem) {
  .team {
    display: none;
  }
  .inline-team {
    display: inline-grid;
    grid-template-columns: repeat(6, min-content);
    justify-content: center;
  }

  .name {
    max-width: 12em;
    white-space: normal;
  }
}

@media (max-width: 35rem) {
  .inline-team {
    grid-template-columns: repeat(3, min-content);
  }
}
</style>

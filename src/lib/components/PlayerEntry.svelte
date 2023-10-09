<script lang="ts">
export let player = {};
let isExpanded = false;

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .slice(1, 3)
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function makeFlag(name) {
  const parts = name.split(' ');
  if(!/\[..\]/.test(parts[parts.length - 1])) {
    return name;
  } else {
    parts[parts.length - 1] = getFlagEmoji(parts[parts.length - 1]);
    return parts.join(' ');
  }
}

function formatResult(result): string {
  return {'W': 'Win', 'L': 'Loss', 'T': 'Tie'}[result] ?? 'Playing';
}

function toggleExpansion() {
  isExpanded = !isExpanded;
}
</script>

<div class="player-card" class:expand={isExpanded}>
  <div class="primary">
    <div>{player.placing}. {makeFlag(player.name)}</div>
    <div>
      {player.record.wins * 3 + player.record.ties} points{player.drop !== -1 ? `, dropped at round ${player.drop}` : ''}
    </div>
  </div>
  <div class="secondary">
    <div class="record">
      <div>Record:</div>
      <div>{player.record.wins} W - {player.record.losses} L</div>
    </div>
    <div class="res">
      <div>Opp. Win%</div>
      <div>{(player.resistances.opp * 100).toFixed(2)}%</div>
    </div>
    <div class="res2">
      <div>Opp. Opp. Win%</div>
      <div>{(player.resistances.oppopp * 100).toFixed(2)}%</div>
    </div>
  </div>
  <div class="schedule">
    <h2>Schedule</h2>
    {#each Object.keys(player.rounds) as round}
      <div>Round {round}</div>
      <div>{formatResult(player.rounds[round].result)} vs. {makeFlag(player.rounds[round].name)}</div>
      <div>Table {player.rounds[round].table}</div>
    {/each}
  </div>
  <div class="toggle">
    <button on:click={toggleExpansion}>{isExpanded ? 'Collapse' : 'Expand'}</button>
  </div>
</div>

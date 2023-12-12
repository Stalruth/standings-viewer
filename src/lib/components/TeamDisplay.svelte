<script lang="ts">
import { Icons } from '@pkmn/img';

import getTeamDisplay from '$lib/getTeamDisplay.ts';

export let player = {};
$: team = player.team ?? [];
$: paste = player.paste ?? "";

function getIconStyle(name) {
  const {left, top} = Icons.getPokemon(name, {scheme: 'https', domain: 'standings.stalruth.dev'});
  return `background-position: ${left}px ${top}px`;
}
</script>

<a href={paste}>
  {#each getTeamDisplay(team) as set}
    <span
      class="pokemon-icon"
      title={set ?? 'No Data'}
      style={getIconStyle(set ?? 'No Data')}
    >
    </span>
  {/each}<span>⎘</span>
</a>

<style>
a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-icon {
  display:inline-block;
  width:40px;
  height:30px;
  image-rendering:pixelated;
  background:transparent url(https://standings.stalruth.dev/sprites/pokemonicons-sheet.png) no-repeat scroll;
}
</style>

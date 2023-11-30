<script lang="ts">
import { Icons } from '@pkmn/img';

import getTeamDisplay from '$lib/getTeamDisplay.ts';

export let player = {};
$: team = player.team ?? [];
$: paste = player.paste ?? "";
</script>

<a href={paste}>
  {#each getTeamDisplay(team) as set}
    <span
      title={set ?? 'No Data'}
      style={Icons.getPokemon(set ?? 'No Data', {scheme: 'https', domain: 'api.standings.stalruth.dev'}).style}
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
</style>

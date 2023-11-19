<script lang="ts">
import { Icons } from '@pkmn/img';

import getTeamDisplay from '$lib/getTeamDisplay.ts';

export let team = [];
</script>

{#each getTeamDisplay(team) as set}
  <span
    title={set ?? 'No Data'}
    style={Icons.getPokemon(set ?? 'No Data').style}
  >
  </span>
{/each}

<style>
</style>

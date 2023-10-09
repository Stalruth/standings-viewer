<script lang="ts">
export let tournaments = [];
export let year = '2024';
</script>

<ul>
  {#each tournaments as tournament}
    <li>
      <a href={`${year}/${tournament.id}`}>{tournament.name}</a> (<a href={`${year}/${tournament.id}/juniors`}>Juniors</a>, <a href={`${year}/${tournament.id}/seniors`}>Seniors</a>, <a href={`${year}/${tournament.id}/masters`}>Masters</a>)
    </li>
  {/each}
</ul>

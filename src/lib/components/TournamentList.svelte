<script lang="ts">
export let tournaments = [];
export let year = '2024';
</script>


{#each tournaments.reverse() as tournament}
  <article>
    {tournament.name}
    <ul>
      <li>
        <a href={`${year}/${tournament.id}/juniors`}>Juniors</a>
      </li>
      <li>
        <a href={`${year}/${tournament.id}/seniors`}>Seniors</a>
      </li>
      <li>
        <a href={`${year}/${tournament.id}/masters`}>Masters</a>
      </li>
    </ul>
  </article>
{/each}

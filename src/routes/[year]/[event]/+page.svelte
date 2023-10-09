<script lang="ts">
export let data;
const year = data.year;
const name = data.name;
</script>

<h1>{year} {name}</h1>

<ul>
  <li>
    <a href={`/${year}/${name}/juniors`}>Juniors</a>
  </li>
  <li>
    <a href={`/${year}/${name}/seniors`}>Seniors</a>
  </li>
  <li>
    <a href={`/${year}/${name}/masters`}>Masters</a>
  </li>
</ul>

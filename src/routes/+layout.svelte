<script lang="ts">
import 'mvp.css';
import '$lib/css/stalruth.css';
import '$lib/css/app.css';
import { page } from '$app/stores';
</script>

{#if $page.route.id !== '/'}
  <header>
    <nav>
      <ul>
        <li>
          <a href="/">Index</a>
        </li>
      </ul>
    </nav>
  </header>
{/if}
<main>
<slot></slot>
</main>
<footer>
  <details>
    <summary>Credits</summary>
    <dl>
      <dt>Programming and Design</dt>
      <dd><a href="https://stalruth.dev">Stuart Rutherford</a> (<a href="https://github.com/Stalruth/cut-explorer/">GitHub</a>)</dd>
      <dt>Original Scraper</dt>
      <dd><a href="https://github.com/JulienGithub">Julien</a></dd>
      <dt>Team Pastes</dt>
      <dd><a href="https://twitter.com/VGCPastes">VGC Pastes</a></dd>
      <dt>Favicon</dt>
      <dd><a href="https://github.com/twitter/twemoji">Twemoji by Twitter</a></dd>
    </dl>
  </details>
</footer>

<style>
header {
  padding-bottom: 0;
}
nav {
  margin-bottom: 0;
}
main {
  padding-top: 0;
}
</style>

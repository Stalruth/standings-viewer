<script lang="ts">
import 'mvp.css';
import '$lib/css/stalruth.css';
import '$lib/css/app.css';
import { page } from '$app/stores';
</script>

<header>
  <nav>
    <p>
      {#each $page.data.breadcrumbs as breadcrumb, i}
        {#if i + 1 < $page.data.breadcrumbs.length}
          <a href={breadcrumb.href}>{breadcrumb.title}</a>
          &nbsp;/&nbsp;
        {:else}
          {breadcrumb.title}
        {/if}
      {/each}
    </p>
  </nav>
</header>

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
  text-align: left;
}
nav {
  margin-bottom: 0;
}
nav ul :first-child {
  margin-left: 0;
}
main {
  padding-top: 0;
}
</style>

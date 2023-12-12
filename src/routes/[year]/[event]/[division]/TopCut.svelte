<script lang="ts">
import { page } from '$app/stores';

export let bracket = [];
export let roundCount = 0;

function getRoundName(roundNumber, roundCount) {
  const roundsLeft = roundCount - roundNumber;
  if(roundsLeft == 1) {
    return 'Finals';
  }
  return `Top ${2 ** roundsLeft}`;
}
</script>

<div class="bracket">
  {#each bracket as round, roundNumber}
    <div class="round">
      <h3>{getRoundName(roundNumber, roundCount)}</h3>
      <div class="game-container">
        {#each round as game}
          <article class="game">
            {#each game.players as player, i}
              {#if game.winner !== i && game.winner !== null}
                <p>
                  <s>
                    <a href={`${$page.url}/${player.id}`}>
                      {player.name}
                    </a>
                  </s>
                </p>
              {:else}
                <p>
                  <a href={`${$page.url}/${player.id}`}>
                    {player.name}
                  </a>
                </p>
              {/if}
              {#if i !== 1}
              <p>
                vs.
              </p>
              {/if}
            {/each}
          </article>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
.bracket {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.round {
  display: flex;
  flex-direction: column;
}

.game-container {
  display: flex;
  gap: 2rem;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-around;
}

.game-container > article {
  flex-grow: 1;
  flex-basis: calc(100% / 3 + 1px);
}

.game p {
  text-align: center;
  margin: 0;
}

@media (min-width: 52.5rem) {
  .bracket {
    flex-direction: row;
  }

  .game-container {
    flex-direction: column;
  }

  .game-container > article {
    flex-grow: 0;
    flex-basis: unset;
  }
}
</style>

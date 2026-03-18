

<script lang="ts">
  type Flashcard = {
    id?: string;
    category?: string;
    subchapter?: string;
    question?: string;
    answer?: string;
  };

  export let title = 'Flashcards';
  export let badges: string[] = [];
  export let flashcards: Flashcard[] = [];
  export let currentFlashcardIndex = 0;
  export let flashcardFlipped = false;
  export let flashcardsError = '';
  export let flashcardsLoaded = false;
  export let chapterLabel = 'Chapter 1';

  export let onPrevious: () => void = () => {};
  export let onFlip: () => void = () => {};
  export let onShuffle: () => void = () => {};
  export let onNext: () => void = () => {};

  function currentFlashcard(): Flashcard | null {
    return flashcards[currentFlashcardIndex] ?? null;
  }
</script>

<section>
  <h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">{title}</h2>
  <div class="mb-2 flex flex-wrap">
    {#each badges as badge}
      <span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">{badge}</span>
    {/each}
  </div>

  <div class="flex flex-col gap-[18px]">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0 flex-[1_1_260px]">
        <div class="mb-2 text-sm text-cs-muted">
          {#if flashcards.length}
            Card {currentFlashcardIndex + 1} of {flashcards.length}{#if currentFlashcard()?.subchapter} • {currentFlashcard()?.subchapter}{/if}
          {:else if flashcardsError}
            No flashcards loaded
          {:else}
            Loading flashcards...
          {/if}
        </div>
        <div class="h-[10px] overflow-hidden rounded-full border border-white/6 bg-white/8">
          <div
            class="h-full bg-[linear-gradient(90deg,rgba(124,156,255,0.95),rgba(156,194,255,0.95))] transition-[width] duration-200"
            style={`width:${flashcards.length ? ((currentFlashcardIndex + 1) / flashcards.length) * 100 : 0}%`}
          ></div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2.5">
        <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.48)] hover:bg-[rgba(124,156,255,0.2)] disabled:cursor-not-allowed disabled:opacity-45" disabled={currentFlashcardIndex === 0 || !flashcards.length} on:click={onPrevious}>← Previous</button>
        <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.48)] hover:bg-[rgba(124,156,255,0.2)] disabled:cursor-not-allowed disabled:opacity-45" disabled={!flashcards.length} on:click={onFlip}>Flip Card</button>
        <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.48)] hover:bg-[rgba(124,156,255,0.2)] disabled:cursor-not-allowed disabled:opacity-45" disabled={flashcards.length < 2} on:click={onShuffle}>Shuffle</button>
        <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.48)] hover:bg-[rgba(124,156,255,0.2)] disabled:cursor-not-allowed disabled:opacity-45" disabled={currentFlashcardIndex === flashcards.length - 1 || !flashcards.length} on:click={onNext}>Next →</button>
      </div>
    </div>

    {#if flashcardsError}
      <div class="rounded-[18px] border border-dashed border-white/20 bg-white/3 p-6 text-[15px] leading-[1.7] text-cs-muted">{flashcardsError}</div>
    {:else if !flashcardsLoaded}
      <div class="rounded-[18px] border border-dashed border-white/20 bg-white/3 p-6 text-[15px] leading-[1.7] text-cs-muted">Loading questions from <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">flashcards.json</span>...</div>
    {:else if currentFlashcard()}
      <div class="relative min-h-[420px] [perspective:1200px]">
        <div class={`relative min-h-[420px] transition-transform duration-500 [transform-style:preserve-3d] ${flashcardFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}`}>
          <article class="absolute inset-0 flex flex-col justify-between rounded-[22px] border border-cs-border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 shadow-cs [backface-visibility:hidden]">
            <div>
              <span class="mb-4 inline-block w-fit rounded-full border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Question</span>
              <div class="mb-[14px] text-[13px] leading-[1.6] text-cs-muted">{currentFlashcard()?.category || chapterLabel} • {currentFlashcard()?.subchapter || 'Flashcard'}</div>
              <h3 class="m-0 whitespace-pre-wrap text-[29px] leading-[1.28] text-white">{currentFlashcard()?.question || ''}</h3>
            </div>
            <div class="text-[13px] leading-[1.6] text-cs-muted">Click “Flip Card” to reveal the answer.</div>
          </article>

          <article class="absolute inset-0 flex flex-col justify-between rounded-[22px] border border-cs-border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 shadow-cs [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <span class="mb-4 inline-block w-fit rounded-full border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Answer</span>
              <div class="mb-[14px] text-[13px] leading-[1.6] text-cs-muted">{currentFlashcard()?.category || chapterLabel} • {currentFlashcard()?.subchapter || 'Flashcard'}</div>
              <p class="m-0 whitespace-pre-wrap text-lg leading-[1.8] text-cs-ok">{currentFlashcard()?.answer || ''}</p>
            </div>
            <div class="text-[13px] leading-[1.6] text-cs-muted">Use Previous / Next to move through the deck.</div>
          </article>
        </div>
      </div>
    {/if}
  </div>
</section>
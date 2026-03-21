<script lang="ts">
  import { onMount } from 'svelte';
  type Flashcard = {
    id?: string;
    category?: string;
    subchapter?: string;
    question?: string;
    answer?: string;
  };

  type FlashcardsFile = Record<string, Flashcard[] | undefined>;
  type CardResponse = 'know' | 'dont-know';
  type ResponseMap = Record<string, CardResponse>;
  type SubchapterStat = {
    code: string;
    label: string;
    known: number;
    unknown: number;
    total: number;
    ratio: number;
  };

  export let title = 'Flashcards';
  export let badges: string[] = [];
  export let chapterKey = 'chapter1';
  export let chapterLabel = 'Chapter 1';
  export let jsonPath = '/flashcards.json';

  let flashcards: Flashcard[] = [];
  let currentFlashcardIndex = 0;
  let flashcardFlipped = false;
  let flashcardsError = '';
  let flashcardsLoaded = false;
  let responses: ResponseMap = {};

  const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.48)] hover:bg-[rgba(124,156,255,0.2)] disabled:cursor-not-allowed disabled:opacity-45';

    $: answeredCount = Object.keys(responses).length;
  $: isFinished = flashcardsLoaded && flashcards.length > 0 && answeredCount === flashcards.length;
  $: currentCard = flashcards[currentFlashcardIndex] ?? null;
  $: progressWidth = flashcards.length ? ((currentFlashcardIndex + 1) / flashcards.length) * 100 : 0;
  $: progressText = flashcards.length
    ? `Card ${currentFlashcardIndex + 1} of ${flashcards.length}${currentCard?.subchapter ? ` • ${currentCard.subchapter}` : ''}`
    : flashcardsError
      ? 'No flashcards loaded'
      : 'Loading flashcards...';

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function updateFlashcardIndex(nextIndex: number): void {
    currentFlashcardIndex = nextIndex;
    flashcardFlipped = false;
  }

  function previousFlashcard(): void {
    if (currentFlashcardIndex > 0) {
      updateFlashcardIndex(currentFlashcardIndex - 1);
    }
  }

  function nextFlashcard(): void {
    if (currentFlashcardIndex < flashcards.length - 1) {
      updateFlashcardIndex(currentFlashcardIndex + 1);
    }
  }

  function toggleFlashcard(): void {
    if (!flashcards.length) return;
    flashcardFlipped = !flashcardFlipped;
  }

  function shuffleFlashcards(): void {
    if (flashcards.length < 2) return;
    flashcards = shuffleArray([...flashcards]);
    updateFlashcardIndex(0);
  }

  function answerCurrentCard(answer: CardResponse): void {
        if (!currentCard) return;

    responses = {
      ...responses,
      [currentCard.id ?? `index-${currentFlashcardIndex}`]: answer
    };
    flashcardFlipped = false;
    
    if (currentFlashcardIndex < flashcards.length - 1) {
      nextFlashcard();
    }
  }

  function getSubchapterCode(card: Flashcard): string {
    const id = card.id ?? '';
    const match = id.match(/^(\d+\.\d+)-/);
    if (match) return match[1];
    return card.subchapter ?? 'Unknown';
  }

  function getSubchapterStats(): SubchapterStat[] {
    const map = new Map<string, SubchapterStat>();

    for (const card of flashcards) {
      const code = getSubchapterCode(card);
      const existing = map.get(code) ?? {
        code,
        label: code,
        known: 0,
        unknown: 0,
        total: 0,
        ratio: 0
      };

      existing.total += 1;

      if (card.id && responses[card.id] === 'know') {
        existing.known += 1;
      }

      if (card.id && responses[card.id] === 'dont-know') {
        existing.unknown += 1;
      }

      existing.ratio = existing.total ? existing.known / existing.total : 0;
      map.set(code, existing);
    }
    console.log('Subchapter stats:', [...map.values()]);
    return [...map.values()].sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
  }

  function getBarColorClass(ratio: number): string {
    if (ratio >= 0.75) return 'bg-[#78df43]';
    if (ratio >= 0.4) return 'bg-[#eadf49]';
    return 'bg-[#ff3b21]';
  }

  function resetSession(): void {
    responses = {};
    currentFlashcardIndex = 0;
    flashcardFlipped = false;
  }


  async function loadFlashcards(): Promise<void> {
    try {
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error('Could not load flashcards.json');
      }

      const data = (await response.json()) as FlashcardsFile;
      flashcards = Array.isArray(data[chapterKey]) ? [...data[chapterKey]!] : [];
      flashcardsError = '';
      flashcardsLoaded = true;

      if (!flashcards.length) {
        flashcardsError = `The JSON file loaded, but it does not contain any ${chapterKey} flashcards.`;
        return;
      }

      currentFlashcardIndex = 0;
      flashcardFlipped = false;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      flashcardsError = `Failed to load flashcards. Make sure flashcards.json exists and contains a ${chapterKey} array. ${message}`;
      flashcardsLoaded = true;
    }
  }

  onMount(() => {
    void loadFlashcards();
  });
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
        <div class="mb-2 text-sm text-cs-muted">{progressText}</div>
        <div class="h-[10px] overflow-hidden rounded-full border border-white/6 bg-white/8">
          <div
            class="h-full bg-[linear-gradient(90deg,rgba(124,156,255,0.95),rgba(156,194,255,0.95))] transition-[width] duration-200"
            style={`width:${progressWidth}%`}
          ></div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2.5">
        <button type="button" class={buttonClass} disabled={currentFlashcardIndex === 0 || !flashcards.length} on:click={previousFlashcard}>← Previous</button>
        <button type="button" class={buttonClass} disabled={!flashcards.length} on:click={toggleFlashcard}>Flip Card</button>
        <button type="button" class={buttonClass} disabled={flashcards.length < 2} on:click={shuffleFlashcards}>Shuffle</button>
        <button type="button" class={buttonClass} on:click={resetSession}>Reset</button>
      </div>
    </div>

    {#if flashcardsError}
      <div class="rounded-[18px] border border-dashed border-white/20 bg-white/3 p-6 text-[15px] leading-[1.7] text-cs-muted">{flashcardsError}</div>
    {:else if !flashcardsLoaded}
      <div class="rounded-[18px] border border-dashed border-white/20 bg-white/3 p-6 text-[15px] leading-[1.7] text-cs-muted">Loading questions from <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">flashcards.json</span>...</div>
    {:else if currentCard}
      <div class="relative min-h-[420px] [perspective:1200px]">
        <div class={`relative min-h-[420px] transition-transform duration-500 [transform-style:preserve-3d] ${flashcardFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}`}>
          <article class="absolute inset-0 flex flex-col justify-between rounded-[22px] border border-cs-border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 shadow-cs [backface-visibility:hidden]">
            <div>
              <span class="mb-4 inline-block w-fit rounded-full border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Question</span>
              <div class="mb-[14px] text-[13px] leading-[1.6] text-cs-muted">{currentCard?.category || chapterLabel} • {currentCard?.subchapter || 'Flashcard'}</div>
              <h3 class="m-0 whitespace-pre-wrap text-[29px] leading-[1.28] text-white">{currentCard?.question || ''}</h3>
            </div>
            <div class="text-[13px] leading-[1.6] text-cs-muted">Click “Flip Card” to reveal the answer.</div>
          </article>

          <article class="absolute inset-0 flex flex-col justify-between rounded-[22px] border border-cs-border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 shadow-cs [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <span class="mb-4 inline-block w-fit rounded-full border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Answer</span>
              <div class="mb-[14px] text-[13px] leading-[1.6] text-cs-muted">{currentCard?.category || chapterLabel} • {currentCard?.subchapter || 'Flashcard'}</div>
              <p class="m-0 whitespace-pre-wrap text-lg leading-[1.8] text-cs-ok">{currentCard?.answer || ''}</p>
            </div>
            <div class="text-[13px] leading-[1.6] text-cs-muted">Use Previous / Next to move through the deck.</div>
          </article>
        </div>
      </div>

      {#if !isFinished}
        <div class="flex flex-wrap gap-2.5">
          <button type="button" class={buttonClass} on:click={() => answerCurrentCard('know')}>Know 😎</button>
          <button type="button" class={buttonClass} on:click={() => answerCurrentCard('dont-know')}>Don't know 🧐</button>
        </div>
      {/if}

      {#if isFinished}
        <div class="mt-2 rounded-[22px] border border-cs-border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-7 shadow-cs">
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span class="mb-3 inline-block rounded-full border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Session summary</span>
              <h3 class="m-0 text-[30px] leading-[1.15] font-semibold text-white">You answered</h3>
            </div>
            <div class="rounded-[16px] border border-cs-border bg-white/4 px-4 py-3 text-right">
              <div class="text-xs uppercase tracking-[0.08em] text-cs-muted">Total progress</div>
              <div class="mt-1 text-lg font-semibold text-white">{answeredCount} / {flashcards.length}</div>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            {#each getSubchapterStats() as stat}
              <div class="rounded-[18px] border border-cs-border bg-white/4 p-4">
                <div class="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <div class="text-[15px] font-semibold text-white">Subchapter {stat.code}</div>
                    <div class="mt-1 text-sm text-cs-muted">
                      Known: {stat.known} • Don’t know: {stat.unknown} • Total: {stat.total}
                    </div>
                  </div>
                  <div class="text-sm font-semibold text-cs-accent-2">{Math.round(stat.ratio * 100)}%</div>
                </div>

                <div class="h-[16px] overflow-hidden rounded-full border border-white/10 bg-black/20">
                  <div
                    class={`h-full rounded-full ${getBarColorClass(stat.ratio)}`}
                    style:width={`${stat.ratio * 100}%`}
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    {/if}
  </div>
</section>
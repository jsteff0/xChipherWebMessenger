<script lang="ts">
	import { onMount } from 'svelte';
	import Flashcards from '../../components/FlashcardsPH.svelte';

	type FlashcardsFile = {
		chapter1?: Flashcards['flashcards'];
	};

	const tabs = [
		{ id: 'tab-1', label: 'Flashcards' },
	] as const;

	let activeTab: (typeof tabs)[number]['id'] = 'tab-1';
	let flashcards: Flashcards['flashcards'] = [];
	let currentFlashcardIndex = 0;
	let flashcardFlipped = false;
	let flashcardsError = '';
	let flashcardsLoaded = false;

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

	async function loadFlashcards(): Promise<void> {
		try {
			const response = await fetch('/flashcards.json');
			if (!response.ok) {
				throw new Error('Could not load flashcards.json');
			}

			const data = (await response.json()) as FlashcardsFile;
			flashcards = Array.isArray(data.chapter1) ? [...data.chapter1] : [];
			flashcardsError = '';
			flashcardsLoaded = true;

			if (!flashcards.length) {
				flashcardsError = 'The JSON file loaded, but it does not contain any chapter1 flashcards.';
				return;
			}

			currentFlashcardIndex = 0;
			flashcardFlipped = false;
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error';
			flashcardsError = `Failed to load flashcards. Make sure flashcards.json exists and contains a chapter1 array. ${message}`;
			flashcardsLoaded = true;
		}
	}

	onMount(() => {
		void loadFlashcards();
	});
</script>

<div class="min-h-screen bg-[linear-gradient(180deg,#0a1022_0%,#0d1430_100%)] font-[Inter,Arial,sans-serif] text-cs-text">
	<div class="mx-auto max-w-[1200px] p-6">
		<section class="mb-5 rounded-[24px] border border-cs-border bg-[linear-gradient(135deg,rgba(124,156,255,0.18),rgba(156,194,255,0.08))] p-7 shadow-cs">
						<h1 class="mb-2 text-[34px] leading-[1.1] font-semibold">Physics Revision Flashcards</h1>
			<p class="max-w-[900px] text-base leading-[1.6] text-cs-muted">
								This page is for physics revision. It loads question-and-answer flashcards from a JSON
				file so you can quickly review the key exam topics, definitions, formulas, practicals,
				and common mark scheme points.
      </p>
		</section>

		<div class="grid grid-cols-1 gap-5 lg:grid-cols-[290px_1fr]">

			<main class="rounded-[22px] border border-cs-border bg-[rgba(18,25,50,0.84)] p-6 shadow-cs lg:min-h-[700px]">
				{#if activeTab === 'tab-1'}
					<Flashcards
						title="Flashcards"
						chapterKey="chapter1"
						chapterLabel="Chapter 1"
					/>
				{/if}
			</main>
		</div>
	</div>
</div>

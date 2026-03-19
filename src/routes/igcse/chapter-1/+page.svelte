<script lang="ts">
	import { onMount } from 'svelte';
	import Flashcards from '../../../components/Flashcards.svelte';

	type FlashcardsFile = {
		chapter1?: Flashcards['flashcards'];
	};

	const tabs = [
		{ id: 'tab-1', label: '1.1 Number Systems' },
		{ id: 'tab-2', label: '1.2 Text, Sound and Images' },
		{ id: 'tab-3', label: '1.3 Data Storage and Compression' },
		{ id: 'tab-4', label: 'Flashcards' },
		{ id: 'tab-5', label: 'Quick Memorise List' }
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
			<h1 class="mb-2 text-[34px] leading-[1.1] font-semibold">Chapter 1 Revision Notes</h1>
			<p class="max-w-[900px] text-base leading-[1.6] text-cs-muted">
				This chapter covers the core ideas of data representation, including number systems,
				text, sound, images, storage size and compression — the essentials you need to
				understand how data is stored and processed by a computer.
			</p>
			<div class="mt-4 flex flex-wrap gap-2.5">
				<a
					href="/igcse"
					class="inline-flex items-center gap-2 rounded-xl border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.5)] hover:bg-[rgba(124,156,255,0.2)]"
				>
					← Back to Main Page
				</a>
			</div>
		</section>

		<div class="grid grid-cols-1 gap-5 lg:grid-cols-[290px_1fr]">
			<aside class="h-fit rounded-[22px] border border-cs-border bg-[rgba(18,25,50,0.9)] p-[14px] shadow-cs lg:sticky lg:top-5">
				<h2 class="mx-2 mt-[6px] mb-3 text-sm tracking-[0.08em] uppercase text-cs-accent-2">
					Subchapters
				</h2>
				{#each tabs as tab}
					<button
						type="button"
						on:click={() => (activeTab = tab.id)}
						class={`mb-2 block w-full rounded-[14px] border px-[14px] py-3 text-left text-sm leading-[1.4] transition duration-200 ${
							activeTab === tab.id
								? 'border-[rgba(124,156,255,0.5)] bg-[linear-gradient(135deg,rgba(124,156,255,0.24),rgba(124,156,255,0.12))] font-semibold text-white'
								: 'border-transparent bg-transparent text-cs-text hover:border-[rgba(124,156,255,0.25)] hover:bg-[rgba(124,156,255,0.1)]'
						}`}
					>
						{tab.label}
					</button>
				{/each}
			</aside>

			<main class="rounded-[22px] border border-cs-border bg-[rgba(18,25,50,0.84)] p-6 shadow-cs lg:min-h-[700px]">
				{#if activeTab === 'tab-1'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">1.1 Number Systems</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Binary</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Hexadecimal</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Overflow</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Two’s complement</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Why computers use binary</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Computers represent all data in binary because electronic components act like switches with only two states: <b>on</b> and <b>off</b>. These are represented by <b>1</b> and <b>0</b>, so any data must be converted into binary before it can be processed.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Denary, binary and hexadecimal</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Denary</b>: base 10, uses digits 0–9</li>
							<li><b>Binary</b>: base 2, uses digits 0 and 1</li>
							<li><b>Hexadecimal</b>: base 16, uses digits 0–9 and letters A–F</li>
							<li>In hexadecimal: <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">A=10, B=11, C=12, D=13, E=14, F=15</span></li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">8-bit binary place values</h3>
						<div class="mt-2 block rounded-[14px] border border-cs-border bg-black/25 px-[14px] py-3 font-mono leading-[1.8] text-[#f6f8ff]">128  64  32  16  8  4  2  1</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">4-bit binary to hexadecimal table</h3>
						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
								<tbody>
									<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Binary</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Hex</th></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0000</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0001</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0010</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">2</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0011</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">3</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0100</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">4</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0101</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">5</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">0110</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">6</td></tr>
									<tr><td class="px-3 py-2.5 text-sm text-cs-ok">0111</td><td class="px-3 py-2.5 text-sm text-cs-ok">7</td></tr>
								</tbody>
							</table>
							<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
								<tbody>
									<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Binary</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Hex</th></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1000</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">8</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1001</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">9</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1010</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">A</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1011</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">B</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1100</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">C</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1101</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">D</td></tr>
									<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">1110</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">E</td></tr>
									<tr><td class="px-3 py-2.5 text-sm text-cs-ok">1111</td><td class="px-3 py-2.5 text-sm text-cs-ok">F</td></tr>
								</tbody>
							</table>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Binary to denary</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Add the place values where there is a 1.</p>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example:</b><br /><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">11101110 = 128 + 64 + 32 + 8 + 4 + 2 = 238</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Denary to binary</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Two main methods:</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>subtracting powers of 2</li>
							<li>repeated division by 2, then reading remainders upwards</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Binary to hexadecimal</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Split the binary number into groups of 4 bits from the right, then convert each group.</p>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example:</b> <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">101111100001 = BE1</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Hexadecimal to binary</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Replace each hex digit with its 4-bit binary equivalent.</p>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example:</b> <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">45A = 0100 0101 1010</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Hexadecimal to denary</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Multiply each hex digit by its place value.</p>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example:</b> <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">45A = (4 × 256) + (5 × 16) + (10 × 1) = 1114</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Denary to hexadecimal</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Use repeated division by 16 and read remainders from bottom to top.</p>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example:</b> <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">2004 = 7D4</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Why hexadecimal is useful</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Hexadecimal is easier for humans to read, remember and write than long binary strings because <b>1 hex digit = 4 binary bits</b>.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Uses of hexadecimal</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>error codes</li>
							<li>MAC addresses</li>
							<li>IPv6 addresses</li>
							<li>HTML colour codes</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">MAC address</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>MAC address</b> uniquely identifies a device on a network and is linked to the <b>network interface card (NIC)</b>.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>usually <b>48 bits</b></li>
							<li>written as <b>6 groups of 2 hexadecimal digits</b></li>
							<li>example: <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">00-1C-B3-4F-25-FE</span></li>
							<li>first half identifies the manufacturer</li>
							<li>second half is the serial number</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">IPv4 and IPv6</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>IPv4</b> is <b>32 bits</b></li>
							<li><b>IPv6</b> is <b>128 bits</b>, written in hexadecimal in groups separated by colons</li>
						</ul>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example IPv6:</b> <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">a8fb:7a88:fff0:0fff:3d21:2085:66fb:f0fa</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">HTML colour codes</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">HTML colours use hexadecimal in the form <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">#RRGGBB</span>, where RR = red, GG = green, BB = blue.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">#FF0000</span> = red</li>
							<li><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">#00FF00</span> = green</li>
							<li><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">#0000FF</span> = blue</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Binary addition</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">0 + 0 = 0</span></li>
							<li><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">0 + 1 = 1</span></li>
							<li><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">1 + 0 = 1</span></li>
							<li><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">1 + 1 = 10</span>, so write 0 and carry 1</li>
							<li>For three bits: <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">1 + 1 + 1 = 11</span>, so write 1 and carry 1</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Overflow</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Overflow</b> happens when the answer is too large to fit in the available number of bits.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>in an <b>8-bit register</b>, the maximum value is <b>255</b></li>
							<li>if the result is greater than 255, overflow occurs</li>
							<li>a <b>9th bit</b> in 8-bit addition is a clear sign of overflow</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Logical binary shifts</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>logical shift</b> moves all bits left or right.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Shift left</b> multiplies by 2 for each shift</li>
							<li><b>Shift right</b> divides by 2 for each shift</li>
							<li>bits shifted out are lost</li>
							<li>empty positions are filled with 0</li>
							<li>too many shifts can give the wrong answer because important bits are lost</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">MSB and LSB</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>MSB</b> = most significant bit = leftmost bit</li>
							<li><b>LSB</b> = least significant bit = rightmost bit</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Two’s complement</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Two’s complement is used to represent <b>positive and negative 8-bit integers</b>.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Place values in 8-bit two’s complement</h3>
						<div class="mt-2 block rounded-[14px] border border-cs-border bg-black/25 px-[14px] py-3 font-mono leading-[1.8] text-[#f6f8ff]">-128  64  32  16  8  4  2  1</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Range</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>minimum = <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">10000000</span> = <b>-128</b></li>
							<li>maximum = <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">01111111</span> = <b>+127</b></li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Sign rule</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>if the leftmost bit is <b>0</b>, the number is positive</li>
							<li>if the leftmost bit is <b>1</b>, the number is negative</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Positive two’s complement</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Positive numbers are written like normal binary, with a 0 in the leftmost bit.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Negative two’s complement</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Method:</p>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>write the positive binary value</li>
							<li>invert all bits</li>
							<li>add 1</li>
						</ol>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example:</b><br />+67 = <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">01000011</span><br />invert = <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">10111100</span><br />add 1 = <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">10111101</span><br />so -67 = <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">10111101</span></div>
					</section>
				{:else if activeTab === 'tab-2'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">1.2 Text, Sound and Images</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">ASCII</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Unicode</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Sampling</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Pixels</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Text representation</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Text is converted into binary so it can be processed by a computer. Computers use <b>character sets</b> to represent characters.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">ASCII</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">ASCII stands for <b>American Standard Code for Information Interchange</b>.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>standard ASCII uses <b>7 bits</b></li>
							<li>codes go from 0 to 127</li>
							<li>used for letters, digits, symbols and control characters</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Unicode</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Unicode can represent a much wider range of characters than ASCII.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>supports many languages and symbols</li>
							<li>includes emojis</li>
							<li>uses more bits per character than ASCII</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Sound representation</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A sound wave is <b>sampled</b> and converted to binary.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Term</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Sample rate</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Number of samples taken each second</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Sample resolution</td><td class="px-3 py-2.5 text-sm text-cs-ok">Number of bits per sample</td></tr>
							</tbody>
						</table>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Higher sample rate improves quality</li>
							<li>Higher sample resolution improves quality</li>
							<li>Higher values also increase file size</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Image representation</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An image is made of <b>pixels</b>, which are converted to binary.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Term</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Resolution</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Number of pixels in the image</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Colour depth</td><td class="px-3 py-2.5 text-sm text-cs-ok">Number of bits used for each colour</td></tr>
							</tbody>
						</table>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Higher resolution improves quality</li>
							<li>Higher colour depth improves quality</li>
							<li>Both also increase file size</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-3'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">1.3 Data Storage and Compression</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Storage units</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">File size</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Lossless</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Lossy</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Storage units</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>bit</li>
							<li>nibble</li>
							<li>byte</li>
							<li>KiB</li>
							<li>MiB</li>
							<li>GiB</li>
							<li>TiB</li>
							<li>PiB</li>
							<li>EiB</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Important facts</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>1 nibble = 4 bits</b></li>
							<li><b>1 byte = 8 bits</b></li>
							<li>Each larger unit is <b>1024</b> of the previous one, not 1000</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">File size calculations</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">You may be asked to calculate image or sound file size using given values.</p>

						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Image file size</h3>
								<p class="text-[15px] leading-[1.7] text-cs-ok">Usually based on:</p>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>resolution</li>
									<li>colour depth</li>
								</ul>
								<p class="text-[15px] leading-[1.7] text-cs-ok"><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">file size = number of pixels × colour depth</span></p>
							</div>

							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Sound file size</h3>
								<p class="text-[15px] leading-[1.7] text-cs-ok">Usually based on:</p>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>sample rate</li>
									<li>sample resolution</li>
									<li>track length</li>
								</ul>
								<p class="text-[15px] leading-[1.7] text-cs-ok"><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">file size = sample rate × sample resolution × time</span></p>
							</div>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Compression</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Compression reduces file size.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>less storage space needed</li>
							<li>less bandwidth needed</li>
							<li>shorter transmission time</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Lossless compression</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Lossless compression reduces file size <b>without permanently losing data</b>.</p>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Example:</b> <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">run length encoding (RLE)</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Lossy compression</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Lossy compression reduces file size by <b>permanently removing data</b>.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>reducing image resolution</li>
							<li>reducing colour depth</li>
							<li>reducing sample rate</li>
							<li>reducing sample resolution</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-4'}
					<Flashcards
						title="Flashcards"
						chapterKey="chapter1"
						chapterLabel="Chapter 1"
					/>
				{:else}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">Quick Memorise List</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Fast recap</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Before exam</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Numbers and ranges</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Binary = base 2</li>
							<li>Denary = base 10</li>
							<li>Hex = base 16</li>
							<li>1 nibble = 4 bits</li>
							<li>1 byte = 8 bits</li>
							<li>8-bit max unsigned value = 255</li>
							<li>8-bit two’s complement range = -128 to +127</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Must-know formulas / rules</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Binary to denary: add place values</li>
							<li>Binary to hex: split into groups of 4</li>
							<li>Shift left = ×2</li>
							<li>Shift right = ÷2</li>
							<li>Image file size = pixels × colour depth</li>
							<li>Sound file size = sample rate × sample resolution × time</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Must-know terms</h3>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">ASCII, Unicode, sample rate, sample resolution, resolution, colour depth, overflow, logical shift, two’s complement, packet, payload, trailer, packet switching, serial, parallel, simplex, half-duplex, full-duplex</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Focus for this page</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">This HTML page intentionally includes only <b>Chapter 1</b> content and leaves out Chapter 2.1.</p>
					</section>
				{/if}
			</main>
		</div>
	</div>
</div>

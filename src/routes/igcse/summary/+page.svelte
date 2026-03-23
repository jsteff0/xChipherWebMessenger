<script lang="ts">
	import Flashcards from "../../../components/Flashcards.svelte";

	const jsonPath = "/flashcards.json";
	const assetsBasePath = "/";

	const boundaries = [
		{
			year: "June 2024",
			ax: { aStar: 107, a: 84, b: 61, c: 38 },
			ay: { aStar: 120, a: 95, b: 70, c: 45 },
			az: { aStar: 109, a: 88, b: 67, c: 47 }
		},
		{
			year: "June 2023",
			ax: { aStar: 102, a: 82, b: 62, c: 42 },
			ay: { aStar: 109, a: 86, b: 63, c: 40 },
			az: { aStar: 109, a: 86, b: 63, c: 40 }
		}
	];

	const examFacts = [
		"Two papers, both compulsory.",
		"Paper 1: Computer Systems, 1 hour 45 minutes, 75 marks, 50%.",
		"Paper 2: Algorithms, Programming and Logic, 1 hour 45 minutes, 75 marks, 50%.",
		"No calculators.",
		"Grades run from A* to G."
	];

	const whatToDo = [
		"Learn exact definitions, because short direct theory marks are everywhere.",
		"Get fast at binary, denary, hexadecimal, sound/image data and compression.",
		"Practise Paper 2 logic: trace tables, pseudocode, arrays, strings, validation and loops.",
		"Revise by weak subchapter, then do mixed full-deck runs before the exam.",
		"Use boundaries only as a rough guide — they change by variant and session."
	];
</script>

<svelte:head>
	<title>All IGCSE Flashcards</title>
	<meta
		name="description"
		content="All IGCSE Computer Science flashcards in one place."
	/>
</svelte:head>

<div class="min-h-screen bg-[#071028] font-[Inter,Arial,sans-serif] text-white">
	<section
		class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 md:px-8 lg:px-10"
	>
		<div
			class="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-8"
		>
			<div
				class="mb-4 inline-flex items-center rounded-full border border-[rgba(124,156,255,0.28)] bg-[rgba(124,156,255,0.14)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#cdd7ff]"
			>
				Full Deck
			</div>

			<h1
				class="m-0 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl"
			>
				All IGCSE Computer Science flashcards
			</h1>

			<p
				class="mt-4 max-w-3xl text-sm leading-7 text-white/72 md:text-base"
			>
				This page loads the full flashcard deck in one place, including
				all chapters, subchapters, images and tables.
			</p>
			<div class="mt-4 flex flex-wrap gap-2.5">
				<a
					href="/igcse"
					class="inline-flex items-center gap-2 rounded-xl border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.5)] hover:bg-[rgba(124,156,255,0.2)]"
				>
					← Back to Main Page
				</a>
			</div>
		</div>

		<div class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
			<section class="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
				<h2 class="m-0 text-2xl font-semibold text-white">Grades and exam structure</h2>
				<ul class="mt-5 space-y-3 pl-5 text-sm leading-7 text-white/80 md:text-base">
					{#each examFacts as fact}
						<li>{fact}</li>
					{/each}
				</ul>

				<div class="mt-6 rounded-[18px] border border-white/10 bg-black/20 p-4">
					<div class="text-sm font-semibold text-white">How grades are distributed</div>
					<p class="mt-3 text-sm leading-7 text-white/75">
						Your final grade comes from both papers together. Each paper is worth 50%, so weak performance
						on one side can drag the overall result down even if the other paper is strong.
					</p>
				</div>
			</section>

			<section class="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
				<h2 class="m-0 text-2xl font-semibold text-white">Recent grade boundaries</h2>
				<div class="mt-5 flex flex-col gap-4">
					{#each boundaries as row}
						<div class="rounded-[18px] border border-white/10 bg-black/20 p-4">
							<div class="text-base font-semibold text-white">{row.year}</div>
							<div class="mt-3 overflow-x-auto">
								<table class="min-w-full border-collapse text-sm text-white/85">
									<thead>
										<tr class="border-b border-white/10 text-left text-white">
											<th class="px-3 py-2 font-semibold">Option</th>
											<th class="px-3 py-2 font-semibold">A*</th>
											<th class="px-3 py-2 font-semibold">A</th>
											<th class="px-3 py-2 font-semibold">B</th>
											<th class="px-3 py-2 font-semibold">C</th>
										</tr>
									</thead>
									<tbody>
										<tr class="border-b border-white/10">
											<td class="px-3 py-2">AX</td>
											<td class="px-3 py-2">{row.ax.aStar}</td>
											<td class="px-3 py-2">{row.ax.a}</td>
											<td class="px-3 py-2">{row.ax.b}</td>
											<td class="px-3 py-2">{row.ax.c}</td>
										</tr>
										<tr class="border-b border-white/10">
											<td class="px-3 py-2">AY</td>
											<td class="px-3 py-2">{row.ay.aStar}</td>
											<td class="px-3 py-2">{row.ay.a}</td>
											<td class="px-3 py-2">{row.ay.b}</td>
											<td class="px-3 py-2">{row.ay.c}</td>
										</tr>
										<tr>
											<td class="px-3 py-2">AZ</td>
											<td class="px-3 py-2">{row.az.aStar}</td>
											<td class="px-3 py-2">{row.az.a}</td>
											<td class="px-3 py-2">{row.az.b}</td>
											<td class="px-3 py-2">{row.az.c}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>

		<section class="rounded-[24px] border border-[rgba(124,156,255,0.22)] bg-[linear-gradient(180deg,rgba(124,156,255,0.16),rgba(124,156,255,0.06))] p-6">
			<h2 class="m-0 text-2xl font-semibold text-white">What you should do</h2>
			<ul class="mt-5 space-y-3 pl-5 text-sm leading-7 text-white/85 md:text-base">
				{#each whatToDo as item}
					<li>{item}</li>
				{/each}
			</ul>
		</section>

		<Flashcards
			title="All flashcards"
			badges={["IGCSE", "Computer Science", "Full deck"]}
			chapterKey="all"
			chapterLabel="All Chapters"
			{jsonPath}
			{assetsBasePath}
		/>
	</section>
</div>

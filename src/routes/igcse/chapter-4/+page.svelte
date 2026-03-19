<script lang="ts">
	import Flashcards from '../../../components/Flashcards.svelte';

	const tabs = [
		{ id: 'tab-1', label: '4.1 Types of Software and Interrupts' },
		{ id: 'tab-2', label: '4.2 Programming Languages, Translators and IDEs' },
		{ id: 'tab-3', label: 'Flashcards' },
		{ id: 'tab-4', label: 'Quick Memorise List' }
	] as const;

	let activeTab: (typeof tabs)[number]['id'] = 'tab-1';
</script>

<div class="min-h-screen bg-[linear-gradient(180deg,#0a1022_0%,#0d1430_100%)] font-[Inter,Arial,sans-serif] text-cs-text">
	<div class="mx-auto max-w-[1200px] p-6">
		<section class="mb-5 rounded-[24px] border border-cs-border bg-[linear-gradient(135deg,rgba(124,156,255,0.18),rgba(156,194,255,0.08))] p-7 shadow-cs">
			<h1 class="mb-2 text-[34px] leading-[1.1] font-semibold">Chapter 4 Revision Notes</h1>
			<p class="max-w-[900px] text-base leading-[1.6] text-cs-muted">
				This chapter introduces the main software concepts you need to know, including types of
				software, operating system functions, interrupts, programming languages, translators and IDEs.
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
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">4.1 Types of Software and Interrupts</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">System software</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Operating system</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Firmware</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Interrupts</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">System software vs application software</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main purpose</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Examples</th>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">System software</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Provides services the computer needs and allows hardware to run properly</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Operating system, utility software, device drivers</td>
								</tr>
								<tr>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Application software</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Provides services the user needs and performs specific tasks</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Word processor, spreadsheet, database, browser, video editor</td>
								</tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Application software examples</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Word processor</b> – create, edit, format and save text documents</li>
							<li><b>Spreadsheet</b> – calculations, modelling, graphs</li>
							<li><b>Database software</b> – organise data into fields and records, query and report</li>
							<li><b>Browser</b> – access and display web pages</li>
							<li><b>Graphics / photo / video editing</b> – manipulate media files</li>
							<li><b>Control and measuring software</b> – works with sensors and control systems</li>
							<li><b>Apps</b> – mobile and tablet software for specific tasks</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">System software examples</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Operating system</b> – manages the computer and provides a platform for apps</li>
							<li><b>Utility software</b> – maintenance and management tools</li>
							<li><b>Device drivers</b> – allow hardware peripherals to communicate with the OS</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Utility software</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Utility</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">What it does</th>
								</tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Anti-virus</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Checks files/programs, compares against virus database, uses heuristic checks, quarantines suspicious files</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Defragmentation</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Rearranges fragmented HDD files into contiguous sectors for faster access</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Back-up software</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Creates scheduled back-ups and helps restore files or system state</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Security software</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Manages protection such as access control, firewall links, encryption, update checking</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Screensaver</td><td class="px-3 py-2.5 text-sm text-cs-ok">Displays images after inactivity and can also lock the computer for security</td></tr>
							</tbody>
						</table>

						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Anti-virus facts</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>Checks files before they are loaded/run</li>
									<li>Uses known-virus database</li>
									<li>Uses heuristic checking</li>
									<li>Can quarantine files</li>
									<li>Must be kept up to date</li>
								</ul>
							</div>
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Back-up best practice</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>Current working version</li>
									<li>Local back-up copy</li>
									<li>Remote back-up copy, for example cloud storage</li>
								</ul>
							</div>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Device drivers</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>device driver</b> is software that enables hardware devices to communicate with the operating system. Without the correct driver, the device will not work properly and may show as not recognised.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Drivers are needed for devices such as printers, mice, memory sticks and cameras.</li>
							<li>When a device is plugged in, the OS looks for its driver.</li>
							<li>USB drivers use <b>descriptors</b> such as vendor ID, product ID and serial number to identify devices.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Operating system functions</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Function</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">What it does</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">File management</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Create, open, close, delete, rename, copy and move files; maintain directories and access rights</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Handling interrupts</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Responds to signals from hardware or software and runs interrupt service routines</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Providing an interface</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Offers CLI or GUI so the user can interact with the system</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Managing peripherals and drivers</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Controls input/output devices using drivers, buffers and queues</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Managing memory</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Tracks memory locations, moves data between RAM and storage, prevents clashes</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Managing multitasking</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Shares resources among processes and uses pre-emptive multitasking</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Providing a platform for applications</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Lets application software run</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Providing system security</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Handles updates, passwords, permissions and recovery tools</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Managing user accounts</td><td class="px-3 py-2.5 text-sm text-cs-ok">Supports separate accounts, custom settings and different access levels</td></tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">GUI vs CLI</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Interface</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Advantages</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Disadvantages</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">CLI</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Direct communication, flexible, uses little memory</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Need to learn commands, slower to type, easy to make mistakes</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">GUI</td><td class="px-3 py-2.5 text-sm text-cs-ok">User-friendly, icons and windows, easier for normal users</td><td class="px-3 py-2.5 text-sm text-cs-ok">Uses more memory, user limited to available options/icons</td></tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Hardware, firmware and operating system</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Applications need all three layers below them to run properly:</p>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Hardware</b> – the physical computer</li>
							<li><b>Firmware</b> – low-level control software, including BIOS / bootloader</li>
							<li><b>Operating system</b> – runs on firmware and provides the platform for applications</li>
						</ol>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							<b class="text-cs-text">Boot sequence to remember:</b><br />
							Applications run on the operating system.<br />
							The operating system runs on firmware.<br />
							The bootloader / firmware runs on the hardware.
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Interrupts</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An <b>interrupt</b> is a signal from hardware or software to the processor, causing it to temporarily stop its current task so the interrupt can be serviced.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Causes of interrupts</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Examples</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Hardware interrupts</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Key pressed on keyboard, mouse movement, printer error, paper jam, I/O device needs service</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Software interrupts</td><td class="px-3 py-2.5 text-sm text-cs-ok">Division by zero, missing executable file, two processes using same memory location</td></tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">How an interrupt is handled</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Current task is paused.</li>
							<li>Status of current task is saved, including contents of PC and registers.</li>
							<li>Start address of the interrupt service routine (<b>ISR</b>) is loaded.</li>
							<li>ISR runs and services the interrupt.</li>
							<li>Saved register values are restored.</li>
							<li>Original task continues.</li>
						</ol>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Buffers and interrupts</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>buffer</b> is a temporary memory area used to store data. Buffers and interrupts are used together when a slow device, such as a printer, needs data from a much faster processor. This stops the CPU wasting time waiting for the device.</p>
					</section>
				{:else if activeTab === 'tab-2'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">4.2 Types of Programming Language, Translators and IDEs</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">High-level</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Low-level</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Compiler vs Interpreter</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">IDE</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">High-level vs low-level languages</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main idea</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Advantages</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Disadvantages</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">High-level language</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Closer to English and problem-oriented</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Easier to read, write, debug and maintain; machine independent</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Usually slower, larger programs, may not use special hardware fully</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Low-level language</td><td class="px-3 py-2.5 text-sm text-cs-ok">Machine dependent and closer to machine code / hardware</td><td class="px-3 py-2.5 text-sm text-cs-ok">Fast execution, small memory use, direct hardware control</td><td class="px-3 py-2.5 text-sm text-cs-ok">Harder to read, write and debug</td></tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Machine code and assembly language</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Machine code</b> is the binary instructions the computer directly understands.</li>
							<li><b>Assembly language</b> is a low-level language using <b>mnemonics</b>, such as <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">LDA</span>, <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">ADD</span>, <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">STO</span>.</li>
							<li>An <b>assembler</b> translates assembly language into machine code.</li>
						</ul>

						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							<b class="text-cs-text">Why programmers may choose assembly:</b>
							<ul class="mt-2 list-disc pl-[22px]">
								<li>to use special hardware</li>
								<li>to use machine-dependent instructions</li>
								<li>to make programs take up less memory</li>
								<li>to make programs run very quickly</li>
							</ul>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Translators</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Translator</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">What it translates</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">How it works</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Output</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Compiler</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">High-level language</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Translates the whole program at once before execution</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Produces executable machine code / object code</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Interpreter</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">High-level language</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Translates and executes line by line</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">No separate executable file produced</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Assembler</td><td class="px-3 py-2.5 text-sm text-cs-ok">Assembly language</td><td class="px-3 py-2.5 text-sm text-cs-ok">Translates low-level mnemonics into machine code</td><td class="px-3 py-2.5 text-sm text-cs-ok">Produces executable machine code</td></tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Compiler vs interpreter</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Feature</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Compiler</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Interpreter</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Translation</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Whole program at once</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Line by line</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Error reporting</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Produces error report for the whole code</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Stops when first error is found</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Execution speed</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Usually faster after compilation</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Usually slower when running</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Development</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Slower to test/debug changes</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Easier and quicker during development</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Need translator at runtime</td><td class="px-3 py-2.5 text-sm text-cs-ok">No</td><td class="px-3 py-2.5 text-sm text-cs-ok">Yes</td></tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Advantages and disadvantages</h3>
						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Compiler</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>Compiled program can be stored</li>
									<li>Runs without compiler</li>
									<li>Executes faster</li>
									<li>Takes less space while running</li>
									<li>But slower to develop, test and debug</li>
								</ul>
							</div>
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Interpreter</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>Good for testing and debugging</li>
									<li>Easy to edit and rerun code during development</li>
									<li>But runs slower</li>
									<li>Needs interpreter each time the program is run</li>
								</ul>
							</div>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">IDE (Integrated Development Environment)</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An <b>IDE</b> helps programmers write, test and debug programs more efficiently.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Common IDE features</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Feature</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Purpose</th></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Code editor</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Write and edit program code in one place</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Run-time environment</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Run the program from inside the IDE</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Translator</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Compiler and/or interpreter included</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Debugger</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Step through code, set breakpoints, inspect variable values</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Error diagnostics</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Shows syntax errors and messages</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Auto-completion</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Suggests variable names, commands and reserved words</td></tr>
								<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Auto-correction</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Suggests or makes fixes while typing</td></tr>
								<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Prettyprint / formatting</td><td class="px-3 py-2.5 text-sm text-cs-ok">Improves layout and readability of code</td></tr>
							</tbody>
						</table>
					</section>
				{:else if activeTab === 'tab-3'}
					<Flashcards
						title="Flashcards"
						badges={['Question / Answer', 'Loaded from JSON', 'Chapter 4 only']}
						chapterKey="chapter4"
						chapterLabel="Chapter 4"
					/>
				{:else}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">Quick Memorise List</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Fast recap</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Before exam</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Must-know definitions</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>System software</b>: software the computer needs to operate</li>
							<li><b>Application software</b>: software the user needs for specific tasks</li>
							<li><b>Operating system</b>: manages hardware, software and user interaction</li>
							<li><b>Firmware</b>: low-level control software, such as BIOS / bootloader</li>
							<li><b>Interrupt</b>: signal that makes the processor pause current work and service something urgent</li>
							<li><b>ISR</b>: interrupt service routine</li>
							<li><b>Buffer</b>: temporary memory area for data</li>
							<li><b>Device driver</b>: lets hardware communicate with the OS</li>
							<li><b>High-level language</b>: easier for humans, machine independent</li>
							<li><b>Low-level language</b>: machine dependent, close to hardware</li>
							<li><b>Assembly language</b>: low-level language using mnemonics</li>
							<li><b>Compiler</b>: translates whole program at once</li>
							<li><b>Interpreter</b>: translates and executes line by line</li>
							<li><b>Assembler</b>: translates assembly language into machine code</li>
							<li><b>IDE</b>: software for writing, testing and debugging programs</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Examiners love asking</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Difference between system and application software</li>
							<li>Functions of the operating system</li>
							<li>GUI vs CLI</li>
							<li>Role of firmware and boot sequence</li>
							<li>How interrupts are generated and serviced</li>
							<li>Difference between hardware and software interrupts</li>
							<li>High-level vs low-level language comparison</li>
							<li>Compiler vs interpreter comparison</li>
							<li>Why assembly language may still be used</li>
							<li>Features of an IDE</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Ultra-fast recap</h3>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							System software runs the computer; application software helps the user do tasks. The OS manages files, memory, peripherals, security, multitasking and user accounts. Firmware sits below the OS and helps boot the computer. Interrupts pause the CPU so urgent tasks can be serviced using an ISR. High-level languages are easier to write and debug; low-level languages are faster and closer to hardware. A compiler translates the whole program, an interpreter works line by line, and an assembler translates assembly. IDEs provide code editing, translators, debugging and error diagnostics.
						</div>
					</section>
				{/if}
			</main>
		</div>
	</div>
</div>
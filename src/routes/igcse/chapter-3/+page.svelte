<script lang="ts">
	import Flashcards from '../../../components/Flashcards.svelte';

	const tabs = [
		{ id: 'tab-1', label: '3.1 Computer Architecture' },
		{ id: 'tab-2', label: '3.2 Input and Output Devices' },
		{ id: 'tab-3', label: '3.3 Data Storage' },
		{ id: 'tab-4', label: '3.4 Network Hardware' },
		{ id: 'tab-5', label: 'Flashcards' },
		{ id: 'tab-6', label: 'Quick Memorise List' }
	] as const;

	let activeTab: (typeof tabs)[number]['id'] = 'tab-1';
</script>

<div class="min-h-screen bg-[linear-gradient(180deg,#0a1022_0%,#0d1430_100%)] font-[Inter,Arial,sans-serif] text-cs-text">
	<div class="mx-auto max-w-[1200px] p-6">
		<section class="mb-5 rounded-[24px] border border-cs-border bg-[linear-gradient(135deg,rgba(124,156,255,0.18),rgba(156,194,255,0.08))] p-7 shadow-cs">
			<h1 class="mb-2 text-[34px] leading-[1.1] font-semibold">Chapter 3 Revision Notes</h1>
			<p class="max-w-[900px] text-base leading-[1.6] text-cs-muted">
				This chapter explains the main hardware concepts in computer systems, including computer architecture,
				input and output devices, storage and network hardware.
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
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">3.1 Computer Architecture</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">CPU</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">FDE cycle</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Registers</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Embedded systems</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">CPU and microprocessor</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">The <b>CPU</b> processes instructions and data so that the computer can produce output. A <b>microprocessor</b> is a type of integrated circuit on a single chip. In a modern computer, the CPU is the central processing component.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Von Neumann architecture</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Von Neumann architecture is based on the stored-program concept. Programs and data are both stored in memory, and the CPU can access memory directly. Instructions are executed one after another in sequence.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Main CPU components</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Component</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Function</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">ALU</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Arithmetic Logic Unit; carries out arithmetic and logic operations</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">CU</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Control Unit; controls operations and sends control signals</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Registers</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Small high-speed storage locations inside the CPU</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">System clock</td><td class="px-3 py-2.5 text-sm text-cs-ok">Produces timing signals so everything stays synchronised</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Special-purpose registers</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Register</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Use</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">PC</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Program Counter</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Stores the address of the next instruction</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">MAR</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Memory Address Register</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Stores the address being read from or written to</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">MDR</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Memory Data Register</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Stores data read from memory or data to be written</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">CIR</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Current Instruction Register</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Stores the current instruction being decoded/executed</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">ACC</td><td class="px-3 py-2.5 text-sm text-cs-ok">Accumulator</td><td class="px-3 py-2.5 text-sm text-cs-ok">Stores temporary results from ALU calculations</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Buses</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Bus</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">What it carries</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Direction</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Address bus</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Memory addresses</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Unidirectional</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Data bus</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Data and instructions</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Bidirectional</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Control bus</td><td class="px-3 py-2.5 text-sm text-cs-ok">Control signals</td><td class="px-3 py-2.5 text-sm text-cs-ok">Bidirectional</td></tr>
						</tbody></table>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Wider address bus = more memory locations can be addressed.</li><li>Wider data bus = larger word length can be transferred.</li></ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Fetch–Decode–Execute cycle</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>The address of the next instruction is held in the <b>PC</b>.</li>
							<li>The address is copied to the <b>MAR</b> using the address bus.</li>
							<li>The instruction at that address is fetched from RAM into the <b>MDR</b>.</li>
							<li>The instruction is copied from MDR to <b>CIR</b>.</li>
							<li>The <b>PC</b> is incremented so it points to the next instruction.</li>
							<li>The instruction in CIR is <b>decoded</b>.</li>
							<li>The instruction is <b>executed</b> by sending control signals to the correct components.</li>
						</ol>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Clock, cache and cores</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Factor</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Effect on performance</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Clock speed</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Number of cycles per second</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Higher clock speed can increase processing speed</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Cache</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Small very fast memory inside CPU</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Larger cache can improve performance</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Cores</td><td class="px-3 py-2.5 text-sm text-cs-ok">Processing units inside the CPU</td><td class="px-3 py-2.5 text-sm text-cs-ok">More cores can improve performance for multitasking/parallel work</td></tr>
						</tbody></table>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Overclocking:</b> increasing the clock speed beyond design limits can cause overheating, instability and crashes.</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Instruction set</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An <b>instruction set</b> is the list of all commands a CPU can process. These commands are machine code. An instruction is usually made of an <b>opcode</b> and an <b>operand</b>.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li><b>Opcode</b> = tells the CPU what operation to perform</li><li><b>Operand</b> = data, address or register involved in the operation</li></ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Embedded systems</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An <b>embedded system</b> is a computer system designed to perform one dedicated function. It is different from a general-purpose computer, which can perform many different tasks.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Examples</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Typical uses</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Cars</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">ABS braking, air bags, fuel injection, GPS, traction control</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Security systems</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Alarm control using sensors and keypad input</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Lighting systems</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Automatic brightness/occupancy control</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Vending machines</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Item selection, temperature control, stock monitoring</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Domestic appliances</td><td class="px-3 py-2.5 text-sm text-cs-ok">Washing machines, microwave ovens, refrigerators</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Benefits and drawbacks of embedded systems</h3>
						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Benefits</h3><ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Small and easy to fit into devices</li><li>Low cost to manufacture</li><li>Low power consumption</li><li>Fast real-time response</li><li>Dedicated to one task, so interfaces can be simple</li></ul></div>
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Drawbacks</h3><ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Can be difficult to upgrade</li><li>Fault finding can be specialist work</li><li>Internet-connected devices can be hacked</li><li>Often thrown away instead of repaired</li></ul></div>
						</div>
					</section>
				{:else if activeTab === 'tab-2'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">3.2 Input and Output Devices</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Input</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Output</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Sensors</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Touch screens</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Input device and output device</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>An <b>input device</b> is hardware used to enter data into a computer system.</li><li>An <b>output device</b> is hardware used to present the results of computer processing.</li></ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Input devices you need to know</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Device</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main idea</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Barcode scanner</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Reads reflected light from bars and converts the pattern into digital data</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">QR code scanner</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses a camera/app to read square pixel patterns that can store much more data than barcodes</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Digital camera</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses CCD/light-sensitive sensors and ADC to produce a digital image</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Keyboard</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Key press completes a circuit; CPU identifies the key and its ASCII code</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Microphone</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Converts sound waves into electrical signals, then ADC converts them to digital data</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Optical mouse</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses LED + sensor to detect movement by comparing reflected images</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">2D scanner</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Scans paper documents into digital images; OCR can turn scanned text into editable text</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">3D scanner</td><td class="px-3 py-2.5 text-sm text-cs-ok">Scans solid objects to create a 3D digital model</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Barcode scanners</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>A laser or LED shines on the barcode.</li><li>Dark bars reflect little light; light spaces reflect more light.</li><li>Sensors detect the pattern and convert it into digital data.</li><li>The barcode is used as a key field to look up records in a database.</li></ul>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Typical benefits:</b> faster checkout, fewer pricing errors, automatic stock control.</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">QR codes</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Made from a square pattern of dark and light pixels.</li><li>Can store much more information than normal barcodes.</li><li>Can be read using smartphone or tablet cameras.</li></ul>
						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Advantages</h3><ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Store more data</li><li>Built-in error checking</li><li>Easier to read with camera devices</li><li>Can include web links and contact details</li></ul></div>
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Disadvantages</h3><ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>More than one QR format exists</li><li>Can be used to spread malicious links or malware</li></ul></div>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Touch screens</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">How it works</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main points</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Capacitive</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Detects change in electrostatic field when touched</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Clear display, durable, projective version supports multi-touch</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Infrared</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Infrared beams are broken when the screen is touched</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Supports multi-touch, durable, can be affected by moisture/light interference</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Resistive</td><td class="px-3 py-2.5 text-sm text-cs-ok">Two layers make contact and voltage change is detected</td><td class="px-3 py-2.5 text-sm text-cs-ok">Works with finger/stylus/gloves, but lower sensitivity and no multi-touch</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Output devices you need to know</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Device</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main idea</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Actuator</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Converts electrical signals into physical movement</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">DLP projector</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses tiny mirrors to project an image</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Inkjet printer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Sprays tiny droplets of ink onto paper</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Laser printer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses toner and laser technology for fast, high-quality printing</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">LED screen</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses light-emitting diodes to form images</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">LCD projector / LCD screen</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses liquid crystal display technology</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Speaker</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Converts electrical signals into sound waves</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">3D printer</td><td class="px-3 py-2.5 text-sm text-cs-ok">Creates a physical object from a digital 3D model</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Sensors</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>sensor</b> is an input device that measures a physical quantity and converts it into data a computer can process.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Sensor</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Data captured / typical use</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Acoustic</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Sound level</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Accelerometer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Acceleration / movement</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Flow</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Rate of liquid or gas flow</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Gas</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Gas concentration</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Humidity</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Amount of water vapour in air</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Infra-red</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Infra-red radiation / heat / beam interruption</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Level</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Liquid or material level</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Light</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Light intensity</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Magnetic field</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Presence/strength of magnetic field</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Moisture</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Water content in soil/material</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">pH</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Acidity or alkalinity</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Pressure</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Pressure level</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Proximity</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Distance / object nearby</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Temperature</td><td class="px-3 py-2.5 text-sm text-cs-ok">Heat / temperature value</td></tr>
						</tbody></table>
					</section>
				{:else if activeTab === 'tab-3'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">3.3 Data Storage</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">RAM</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">ROM</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Virtual memory</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Cloud</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Primary storage</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Primary storage</b> is directly accessed by the CPU. It mainly includes <b>RAM</b> and <b>ROM</b>.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main features</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">RAM</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Random Access Memory</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Volatile, stores programs/data currently in use, fast read/write access</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">ROM</td><td class="px-3 py-2.5 text-sm text-cs-ok">Read Only Memory</td><td class="px-3 py-2.5 text-sm text-cs-ok">Non-volatile, stores start-up firmware/boot instructions</td></tr>
						</tbody></table>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Why both are needed:</b> RAM is needed for temporary working storage while the computer is running; ROM is needed to store permanent start-up instructions.</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Secondary storage</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Secondary storage</b> is not directly accessed by the CPU and is used for permanent storage of files and programs.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Types of secondary storage</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">How it works</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Examples</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Magnetic</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses platters divided into tracks and sectors; data read/written by electromagnets</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Hard disk drive, magnetic tape</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Optical</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses laser to read/write pits and lands</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">CD, DVD, Blu-ray</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Solid-state (flash)</td><td class="px-3 py-2.5 text-sm text-cs-ok">Uses NAND/NOR technology with floating gates and control gates</td><td class="px-3 py-2.5 text-sm text-cs-ok">SSD, USB flash drive, memory card</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Virtual memory</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Virtual memory</b> is part of secondary storage used as if it were RAM when RAM is full.</p>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Pages of data are moved between RAM and virtual memory when needed.</li><li>This allows more programs/data to run than RAM alone could hold.</li><li>It is slower than real RAM because it uses secondary storage.</li></ol>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Cloud storage</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Cloud storage</b> means storing data on remote servers accessed via the internet rather than only on local devices.</p>
						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Advantages</h3><ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Remote access from different devices</li><li>Easy sharing and collaboration</li><li>Off-site backup</li><li>No need to buy as much local storage hardware</li></ul></div>
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Disadvantages</h3><ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Needs internet access</li><li>Possible security/privacy concerns</li><li>May involve ongoing subscription cost</li><li>Access speed depends on internet connection</li></ul></div>
						</div>
					</section>
				{:else if activeTab === 'tab-4'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">3.4 Network Hardware</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">NIC</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">MAC</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">IP</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Router</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">NIC</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A computer needs a <b>network interface card (NIC)</b> to access a network. The NIC provides the hardware connection and is given a MAC address when manufactured.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">MAC address</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>MAC address</b> uniquely identifies a network device. It is usually written in <b>hexadecimal</b>.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Created from a <b>manufacturer code</b> and a <b>serial code</b></li><li>Typical format: <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">00-1C-B3-4F-25-FE</span></li><li>Used to identify the physical network interface</li></ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">IP address</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An <b>IP address</b> is allocated by the network and is used so devices can be identified and data can be sent to the correct destination.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main points</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Static IP</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Fixed address that does not normally change</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Dynamic IP</td><td class="px-3 py-2.5 text-sm text-cs-ok">Address assigned automatically by the network and can change</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">IPv4 vs IPv6</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Version</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main features</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">IPv4</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">32 bits, written in denary, e.g. 192.168.0.1</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">IPv6</td><td class="px-3 py-2.5 text-sm text-cs-ok">128 bits, written in hexadecimal groups, e.g. 2001:0db8:85a3::8a2e:0370:7334</td></tr>
						</tbody></table>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>IPv6 has a much larger address space than IPv4.</li></ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Router</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>router</b> sends data to a specific destination on a network.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok"><li>Connects a local network to the internet</li><li>Can assign IP addresses to devices on the local network</li><li>Routes packets towards their destination</li></ul>
					</section>
				{:else if activeTab === 'tab-5'}
					<Flashcards
						title="Flashcards"
						badges={['Question / Answer', 'Loaded from JSON', 'Chapter 3 only']}
						chapterKey="chapter3"
						chapterLabel="Chapter 3"
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
							<li><b>CPU</b>: processes instructions and data</li>
							<li><b>Microprocessor</b>: CPU on a single chip</li>
							<li><b>ALU</b>: carries out arithmetic and logic operations</li>
							<li><b>CU</b>: controls operations and sends control signals</li>
							<li><b>Instruction set</b>: all commands a CPU can process</li>
							<li><b>Embedded system</b>: computer designed for one dedicated function</li>
							<li><b>Input device</b>: enters data into the system</li>
							<li><b>Output device</b>: presents results from the system</li>
							<li><b>Sensor</b>: captures physical data and converts it into signals/data</li>
							<li><b>Primary storage</b>: directly accessed by CPU</li>
							<li><b>Secondary storage</b>: permanent storage not directly accessed by CPU</li>
							<li><b>Virtual memory</b>: secondary storage used like RAM when RAM is full</li>
							<li><b>Cloud storage</b>: remote server-based storage</li>
							<li><b>NIC</b>: hardware that allows network access</li>
							<li><b>MAC address</b>: hardware/network interface identifier</li>
							<li><b>IP address</b>: network address allocated for communication</li>
							<li><b>Router</b>: sends data to the correct destination and can connect LAN to internet</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Exam favourites</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Registers and their functions: PC, MAR, MDR, CIR, ACC</li>
							<li>Steps of the fetch–decode–execute cycle</li>
							<li>Difference between address, data and control bus</li>
							<li>How cores, cache and clock affect CPU performance</li>
							<li>Benefits/drawbacks of embedded systems</li>
							<li>Differences between input devices and output devices</li>
							<li>Touch screen types and their pros/cons</li>
							<li>Choosing the right sensor for a scenario</li>
							<li>Differences between RAM and ROM</li>
							<li>Magnetic vs optical vs solid-state storage</li>
							<li>Cloud storage pros and cons</li>
							<li>Differences between MAC and IP addresses</li>
							<li>Static vs dynamic IP, IPv4 vs IPv6, router role</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Ultra-fast recap</h3>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">CPU = ALU + CU + registers. FDE cycle = fetch, decode, execute. PC, MAR, MDR, CIR, ACC must be memorised. More cache / more cores / faster clock can improve performance. Embedded systems do one dedicated task. Input devices capture data; output devices show results. RAM is volatile, ROM is non-volatile. Magnetic, optical and solid-state storage work differently. NIC connects to network. MAC identifies hardware. IP identifies device on network. Router sends data to destination and connects LAN to internet.</div>
					</section>
				{/if}
			</main>
		</div>
	</div>
</div>
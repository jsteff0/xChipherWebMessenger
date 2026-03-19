<script lang="ts">
	import Flashcards from '../../../components/Flashcards.svelte';

	const tabs = [
		{ id: 'tab-1', label: '2.1 Types and Methods of Data Transmission' },
		{ id: 'tab-2', label: '2.2 Methods of Error Detection' },
		{ id: 'tab-3', label: '2.3 Encryption' },
		{ id: 'tab-4', label: 'Flashcards' },
		{ id: 'tab-5', label: 'Quick Memorise List' }
	] as const;

	let activeTab: (typeof tabs)[number]['id'] = 'tab-1';
</script>

<div class="min-h-screen bg-[linear-gradient(180deg,#0a1022_0%,#0d1430_100%)] font-[Inter,Arial,sans-serif] text-cs-text">
	<div class="mx-auto max-w-[1200px] p-6">
		<section class="mb-5 rounded-[24px] border border-cs-border bg-[linear-gradient(135deg,rgba(124,156,255,0.18),rgba(156,194,255,0.08))] p-7 shadow-cs">
			<h1 class="mb-2 text-[34px] leading-[1.1] font-semibold">Chapter 2 Revision Notes</h1>
			<p class="max-w-[900px] text-base leading-[1.6] text-cs-muted">
				This chapter focuses on how data is transmitted, checked for errors and protected,
				covering packets, transmission methods, error detection and encryption.
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
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">
							2.1 Types and Methods of Data Transmission
						</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Packets</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Packet switching</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Serial/Parallel</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">USB</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Data packets</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							When data is sent over long distances, it is usually broken into
							<b>data packets</b>. Small packets are easier to control than one long continuous
							data stream, and each packet can be sent by a different route if needed.
						</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Packet structure</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Part</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">What it contains</th>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Header</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Source address, destination address, packet number / sequence number, size of packet</td>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Payload</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">The actual data being sent</td>
								</tr>
								<tr>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Trailer</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">End-of-packet marker and error checking data</td>
								</tr>
							</tbody>
						</table>

						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
							<b class="text-cs-text">Header facts to know:</b>
							<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
								<li>IP address of sender</li>
								<li>IP address of receiver</li>
								<li>sequence number so packets can be reassembled in order</li>
								<li>packet size so the receiver can check all data arrived</li>
							</ul>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Packet switching</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							<b>Packet switching</b> is a method where a message is broken into packets and each
							packet may travel independently across the network. At the destination, packets are
							put back into the correct order using the packet numbers in the header.
						</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Each packet may take a different route.</li>
							<li>A <b>router</b> decides which route each packet takes.</li>
							<li>Packets may arrive out of order.</li>
							<li>Packets are reordered at the destination.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Advantages of packet switching</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>No need to reserve one communication line for the entire transmission.</li>
							<li>Packets can be re-routed around busy or faulty lines.</li>
							<li>High data transmission rate is possible.</li>
							<li>The system is easy to expand.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Disadvantages of packet switching</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Packets can be lost and may need to be re-sent.</li>
							<li>There may be delay while packets are reordered.</li>
							<li>Real-time streaming is more prone to errors or lag.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Transmission modes</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Mode</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Example</th>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Simplex</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Data travels in one direction only</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Computer to printer</td>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Half-duplex</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Data travels both ways, but not at the same time</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Walkie-talkie</td>
								</tr>
								<tr>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Full-duplex</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Data travels both ways at the same time</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Broadband connection</td>
								</tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Serial and parallel transmission</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main points</th>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Serial</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">One bit at a time along one wire/channel</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">More reliable over long distances, slower, no skewing</td>
								</tr>
								<tr>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Parallel</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Several bits at the same time across several wires/channels</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Faster, works best over short distances, can suffer from skewing</td>
								</tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Serial transmission facts</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>One bit sent at a time.</li>
							<li>Works well over long distances.</li>
							<li>Data arrives fully synchronised.</li>
							<li>Slower than parallel transmission.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Parallel transmission facts</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Several bits sent at the same time, often one byte.</li>
							<li>Faster than serial transmission.</li>
							<li>Works well over short distances.</li>
							<li>Can suffer from <b>skewing</b>, where bits arrive out of sync.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">USB (Universal Serial Bus)</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							USB is a common standard method for connecting devices to a computer and transferring
							data. It is a form of <b>serial data transmission</b>.
						</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">How USB works</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>When a USB device is plugged in, the computer detects it automatically.</li>
							<li>The correct device driver is loaded so the computer and device can communicate.</li>
							<li>If needed, the user may be asked to download a driver.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">USB benefits</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Devices are detected automatically.</li>
							<li>Drivers are loaded automatically.</li>
							<li>Industry standard, so it is widely supported.</li>
							<li>Can support different transfer rates.</li>
							<li>No separate power supply needed for many devices.</li>
							<li>Supports error checking and retransmission.</li>
							<li>Backward compatible.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">USB drawbacks</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Standard USB cable length is limited, usually about 5 m or less.</li>
							<li>Older USB versions may not always be fully supported.</li>
							<li>USB can be slower than technologies such as Ethernet.</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-2'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">
							2.2 Methods of Error Detection
						</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Parity</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Checksum</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Echo check</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">ARQ</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Why error detection is needed</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							When data is transmitted, errors can happen due to interference, packet loss, data gain,
							data change, or skewing. Error detection is needed to make sure data has not been
							corrupted during transmission.
						</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">How errors can occur</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Interference</b> can corrupt bits in transmission.</li>
							<li><b>Packet switching problems</b> can cause loss or gain of data.</li>
							<li><b>Skewing</b> in parallel transmission can cause bits to arrive out of order.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Parity check</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							A <b>parity check</b> uses a parity bit to make the total number of 1s either even or odd.
						</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Rule</th>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Even parity</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Total number of 1 bits must be even</td>
								</tr>
								<tr>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Odd parity</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Total number of 1 bits must be odd</td>
								</tr>
							</tbody>
						</table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">How parity works</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Sender and receiver agree whether even or odd parity is used.</li>
							<li>The parity bit is added before transmission.</li>
							<li>The receiver recalculates parity after reception.</li>
							<li>If parity is wrong, an error is detected.</li>
						</ul>

						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							<b class="text-cs-text">Important limitation:</b> parity can detect that an error
							happened, but it usually cannot tell exactly which bit changed. It can also miss errors if
							an even number of bits change.
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Parity block check</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							A <b>parity block check</b> uses parity both horizontally and vertically across a block
							of bytes. This can identify not only that an error occurred, but also where the wrong bit
							is located.
						</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Checksum</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							A <b>checksum</b> is a value calculated from a block of data using an agreed algorithm.
						</p>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Sender calculates the checksum.</li>
							<li>Checksum is sent with the data block.</li>
							<li>Receiver recalculates the checksum from the received data.</li>
							<li>If the two checksum values match, no error is assumed.</li>
							<li>If they do not match, the data block is re-sent.</li>
						</ol>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Echo check</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							With an <b>echo check</b>, the receiver sends the data back to the sender. The sender
							compares the returned data with the original.
						</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>If both are identical, the data is assumed correct.</li>
							<li>If they are different, an error occurred at some stage.</li>
						</ul>

						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							<b class="text-cs-text">Limitation:</b> echo check cannot tell whether the error
							happened on the original transmission or on the return transmission.
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Check digit</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							A <b>check digit</b> is the final digit in a code and is calculated from the other digits.
							It is used to detect data entry errors.
						</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">What check digits can detect</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>incorrect digit entered</li>
							<li>transposition errors, where two digits swap places</li>
							<li>missing digits or extra digits</li>
							<li>some phonetic errors</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Where check digits are used</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>ISBN numbers</li>
							<li>bar codes</li>
							<li>VINs and product codes</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">ARQ (Automatic Repeat Query / Request)</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							<b>ARQ</b> is used to make sure data arrives without error by using acknowledgements and
							timeout.
						</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>If data is correct, a <b>positive acknowledgement</b> is sent.</li>
							<li>If data is wrong, a <b>negative acknowledgement</b> is sent and the data is re-sent.</li>
							<li>If no acknowledgement arrives in time, a <b>timeout</b> occurs and the sender re-sends the data.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">ARQ facts to remember</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>uses positive acknowledgement</li>
							<li>uses negative acknowledgement</li>
							<li>uses timeout</li>
							<li>often used in mobile phone networks</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-3'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">2.3 Encryption</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Plaintext</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Ciphertext</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Symmetric</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Asymmetric</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Purpose of encryption</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							When data is transmitted over a public network, it can be intercepted by an eavesdropper
							or hacker. <b>Encryption</b> makes the data unreadable to anyone who should not access it.
						</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">What encryption does</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Original readable data is called <b>plaintext</b>.</li>
							<li>Encrypted unreadable data is called <b>ciphertext</b>.</li>
							<li>Encryption does not stop interception, but it makes the intercepted data useless without the correct key.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Symmetric encryption</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">
							<b>Symmetric encryption</b> uses the <b>same key</b> for encryption and decryption.
						</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Sender uses the key to encrypt the plaintext.</li>
							<li>Receiver uses the same key to decrypt the ciphertext.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Advantages of symmetric encryption</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Simple to use.</li>
							<li>Fast for processing large amounts of data.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Main drawback of symmetric encryption</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>The same secret key must be shared by sender and receiver.</li>
							<li>If the key is intercepted, the data can be read.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Asymmetric encryption</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Asymmetric encryption</b> uses two keys:</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Public key</b> — can be shared with everyone</li>
							<li><b>Private key</b> — kept secret by the owner</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">How asymmetric encryption works</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>The receiver creates a matching public and private key pair.</li>
							<li>The receiver sends the public key to the sender.</li>
							<li>The sender encrypts the message using the receiver’s public key.</li>
							<li>The receiver decrypts the message using the matching private key.</li>
						</ol>

						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							<b class="text-cs-text">Important rule:</b> a message encrypted with the public key can
							only be decrypted with the matching private key.
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Why asymmetric encryption is more secure</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>The private key is never shared.</li>
							<li>Only the public key is shared openly.</li>
							<li>This removes the main key-sharing problem of symmetric encryption.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Key terms</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]">
							<tbody>
								<tr>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Term</th>
									<th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Plaintext</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Original readable message</td>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Ciphertext</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Encrypted unreadable message</td>
								</tr>
								<tr>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Public key</td>
									<td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Key that can be shared openly</td>
								</tr>
								<tr>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Private key</td>
									<td class="px-3 py-2.5 text-sm text-cs-ok">Secret key known only to the owner</td>
								</tr>
							</tbody>
						</table>
					</section>
				{:else if activeTab === 'tab-4'}
					<Flashcards
						title="Flashcards"
						chapterKey="chapter2"
						chapterLabel="Chapter 2"
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
							<li><b>Packet</b>: a small unit of data sent over a network</li>
							<li><b>Packet switching</b>: message split into packets that may take different routes</li>
							<li><b>Simplex</b>: one direction only</li>
							<li><b>Half-duplex</b>: both directions, not at the same time</li>
							<li><b>Full-duplex</b>: both directions at the same time</li>
							<li><b>Serial</b>: one bit at a time</li>
							<li><b>Parallel</b>: multiple bits at once</li>
							<li><b>Parity</b>: uses a parity bit to detect errors</li>
							<li><b>Checksum</b>: calculated value used to check a block of data</li>
							<li><b>Echo check</b>: returned copy of data is compared to the original</li>
							<li><b>Check digit</b>: final digit used to detect entry errors</li>
							<li><b>ARQ</b>: retransmission system using acknowledgements and timeout</li>
							<li><b>Encryption</b>: converting data into unreadable form</li>
							<li><b>Symmetric encryption</b>: same key for encrypt and decrypt</li>
							<li><b>Asymmetric encryption</b>: public and private key system</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Things examiners love asking</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Structure of a packet: header, payload, trailer</li>
							<li>Role of router in packet switching</li>
							<li>Serial vs parallel comparison</li>
							<li>Simplex vs half-duplex vs full-duplex</li>
							<li>Advantages and drawbacks of USB</li>
							<li>How parity, checksum and echo check work</li>
							<li>Examples of where check digits are used</li>
							<li>How ARQ uses positive acknowledgement, negative acknowledgement and timeout</li>
							<li>Difference between symmetric and asymmetric encryption</li>
							<li>Role of public and private keys</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Ultra-fast recap</h3>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							Packet = header + payload + trailer.<br />
							Router chooses route.<br />
							Serial = slower, long distance, reliable.<br />
							Parallel = faster, short distance, skewing risk.<br />
							Parity/checksum/echo check/check digit/ARQ = error detection methods.<br />
							Encryption protects data from eavesdroppers.<br />
							Symmetric = one shared key.<br />
							Asymmetric = public key + private key.
						</div>
					</section>
				{/if}
			</main>
		</div>
	</div>
</div>
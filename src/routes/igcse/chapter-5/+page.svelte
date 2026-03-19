<script lang="ts">
	import Flashcards from '../../../components/Flashcards.svelte';

	const tabs = [
		{ id: 'tab-1', label: '5.1 The Internet and the World Wide Web' },
		{ id: 'tab-2', label: '5.2 Digital Currency' },
		{ id: 'tab-3', label: '5.3 Cyber Security' },
		{ id: 'tab-4', label: 'Flashcards' },
		{ id: 'tab-5', label: 'Quick Memorise List' }
	] as const;

	let activeTab: (typeof tabs)[number]['id'] = 'tab-1';
</script>

<div class="min-h-screen bg-[linear-gradient(180deg,#0a1022_0%,#0d1430_100%)] font-[Inter,Arial,sans-serif] text-cs-text">
	<div class="mx-auto max-w-[1200px] p-6">
		<section class="mb-5 rounded-[24px] border border-cs-border bg-[linear-gradient(135deg,rgba(124,156,255,0.18),rgba(156,194,255,0.08))] p-7 shadow-cs">
			<h1 class="mb-2 text-[34px] leading-[1.1] font-semibold">Chapter 5 Revision Notes</h1>
			<p class="max-w-[900px] text-base leading-[1.6] text-cs-muted">
				This chapter covers the internet, the World Wide Web, digital currency and cyber security,
				helping you understand both online systems and the risks that come with them.
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
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">5.1 The Internet and the World Wide Web</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Internet vs WWW</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">URL</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">HTTP/HTTPS</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Cookies</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Internet vs World Wide Web</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Internet</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">World Wide Web (WWW)</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">The worldwide infrastructure: a collection of interconnected networks and devices</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">A collection of websites and web pages accessed using the internet</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Used for email, chatting, file transfer and many other services</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses web browsers to access and display web pages</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Makes use of protocols such as TCP/IP</td><td class="px-3 py-2.5 text-sm text-cs-ok">Uses HTTP/HTTPS and HTML</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">URL (Uniform Resource Locator)</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>URL</b> is a text-based address used to locate a web page or file.</p>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">protocol://website address/path/file name</span></div>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Protocol</b> – usually <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">http</span> or <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">https</span></li>
							<li><b>Website address</b> – can contain host, domain name, domain type and country code</li>
							<li><b>Path</b> – the web page or folder location</li>
							<li><b>File name</b> – the actual file or page item</li>
						</ul>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><b class="text-cs-text">Example:</b> <span class="rounded-lg border border-white/8 bg-black/30 px-[6px] py-[2px] font-mono text-white">https://www.hoddereducation.co.uk/ict</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">HTTP and HTTPS</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>HTTP</b> = HyperText Transfer Protocol</li>
							<li>It is a set of rules for transferring files across the internet</li>
							<li><b>HTTPS</b> = secure version of HTTP</li>
							<li>The <b>s</b> means <b>secure</b> and usually uses SSL or TLS</li>
							<li>HTTPS is used when data needs more secure transfer</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Web browsers</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>web browser</b> is software that retrieves, interprets and displays web pages. Its main job is to render <b>HTML</b> and show text, images, video and audio on the device screen.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Browser functions you must know</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">storing bookmarks and favourites</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">recording browsing history</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">allowing multiple tabs</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">storing cookies</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">providing navigation tools</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">providing an address bar</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">How web pages are located, retrieved and displayed</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>The user enters a URL in the browser.</li>
							<li>The browser asks a <b>DNS server</b> for the IP address that matches the domain name.</li>
							<li>If needed, DNS may ask another DNS server.</li>
							<li>The IP address is returned to the browser.</li>
							<li>The browser connects to the <b>web server</b> using that IP address.</li>
							<li>The web server sends back HTML files and other resources.</li>
							<li>The browser interprets the HTML and displays the web page.</li>
						</ol>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><b class="text-cs-text">Roles to remember:</b> <span class="text-[15px] leading-[1.7] text-cs-ok">browser, IP address, DNS, web server, HTML.</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Cookies</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Cookies</b> are small files or pieces of code stored on a user’s device by websites. They are used to remember information and preferences.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main idea</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Session cookie</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Temporary; usually deleted when browser is closed or session ends</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Persistent cookie</td><td class="px-3 py-2.5 text-sm text-cs-ok">Stored on the hard drive until expiry date or manual deletion</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Uses of cookies</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>saving personal details</li>
							<li>tracking user preferences</li>
							<li>holding items in an online shopping cart</li>
							<li>storing login details</li>
							<li>remembering language and currency choices</li>
							<li>tracking browsing history and habits</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-2'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">5.2 Digital Currency</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Digital currency</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Cryptocurrency</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Blockchain</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Digital currency</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Digital currency</b> is money that exists only electronically. It has no physical form like notes or coins.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Used to pay for goods and services</li>
							<li>Can be transferred between accounts</li>
							<li>Used in online banking and payment systems such as digital wallets</li>
							<li>Usually relies on a central banking system</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Cryptocurrency</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Cryptocurrency</b> is a type of digital currency that uses cryptography and decentralisation.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>No central bank controls the system</li>
							<li>Transactions are public and can be tracked</li>
							<li>Uses a blockchain network for security</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Blockchain</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Blockchain</b> is a decentralised digital ledger: a time-stamped series of records that cannot easily be altered.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Each block contains</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Data</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Transaction details, such as sender, receiver, amount</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Hash value</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">A unique fingerprint for the block</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Previous hash value</td><td class="px-3 py-2.5 text-sm text-cs-ok">Links the block to the previous block in the chain</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">How blockchain works</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>A new transaction creates a new block.</li>
							<li>The new block gets its own unique hash value.</li>
							<li>The block stores the previous hash, linking it to the chain.</li>
							<li>The new block is copied to all computers in the network.</li>
							<li>Network members check the new block before it is added.</li>
							<li>If a previous block changes, the following hashes become invalid and the chain breaks.</li>
						</ol>

						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4"><b class="text-cs-text">Why blockchain is secure:</b> <span class="text-[15px] leading-[1.7] text-cs-ok">changing one block changes its hash, which breaks the chain. Because copies exist across many networked computers, tampering is very difficult.</span></div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Proof-of-work and miners</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Proof-of-work</b> slows down the creation of new blocks</li>
							<li><b>Miners</b> help verify and add new blocks</li>
							<li>This makes hacking and rapid fake chain creation much harder</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-3'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">5.3 Cyber Security</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Threats</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Malware</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Authentication</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Firewalls</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Cyber security threats you must know</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>brute-force attack</li>
							<li>data interception</li>
							<li>distributed denial of service (DDoS) attack</li>
							<li>hacking</li>
							<li>malware: virus, worm, Trojan horse, spyware, adware, ransomware</li>
							<li>pharming</li>
							<li>phishing</li>
							<li>social engineering</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Brute-force attack</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>brute-force attack</b> is when a hacker systematically tries combinations of characters until a password is found.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Weak passwords are easier to crack</li>
							<li>Long passwords with mixed character types are harder to crack</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Data interception</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Data interception</b> means stealing data by tapping into wired or wireless communication links.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Can use packet sniffers on wired networks</li>
							<li>Can use wardriving on wireless networks</li>
							<li>Encryption makes intercepted data unreadable without the key</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">DDoS attack</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">A <b>distributed denial of service (DDoS)</b> attack floods a target with huge amounts of traffic from many computers so legitimate users cannot access services.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Can block websites, online services and even email accounts</li>
							<li>Signs include slow performance, inability to access sites, large amounts of spam</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Hacking</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Hacking</b> is gaining illegal access to a computer system without permission. Data may be stolen, changed, deleted or corrupted.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Can be reduced using firewalls, usernames, strong passwords and anti-hacking tools</li>
							<li><b>Ethical hacking</b> is authorised testing of system security</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Malware summary</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main idea</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Virus</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Replicates and needs an active host program to run</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Worm</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Standalone malware that self-replicates across networks</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Trojan horse</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Malicious software disguised as legitimate software</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Spyware</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Monitors activity and sends information back to the attacker</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Adware</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Floods the user with unwanted advertising</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Ransomware</td><td class="px-3 py-2.5 text-sm text-cs-ok">Encrypts files and demands money to unlock them</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Phishing</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Phishing</b> uses legitimate-looking emails or messages to trick the user into clicking links, opening attachments or revealing personal data.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Usually needs the victim to take some action</li>
							<li>Can lead to fake websites and stolen credentials</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Pharming</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Pharming</b> redirects a user to a fake website without their knowledge, often by altering DNS data or using malicious code.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>User may type the correct URL and still end up on a fake site</li>
							<li>Can steal bank details and login information</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Social engineering</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Social engineering</b> manipulates people into ignoring good security practice.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Method</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">How it works</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Instant messaging</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Malicious links sent in messages</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Emails/phishing</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Fake emails that appear genuine</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Baiting</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Leaving infected media, such as USB drives, for people to find</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Phone calls</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Pretending to be support staff and asking the user to install software or reveal details</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Scareware</td><td class="px-3 py-2.5 text-sm text-cs-ok">Fake warnings that try to panic the user into installing malware</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Keeping data safe</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Method</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Purpose</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Access levels</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Give different users different permissions</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Anti-malware</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Detects and removes malicious software</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Authentication</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Proves who the user is</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Automatic software updates</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Install security patches and improvements</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Checking spelling/tone and URLs</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Helps detect scams and phishing</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Firewalls</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Filter traffic in and out of the system</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Privacy settings</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Control what others can see or access</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Proxy servers</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Act between user and internet; can filter and mask access</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">SSL</td><td class="px-3 py-2.5 text-sm text-cs-ok">Securely encrypts data sent over the web</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Authentication</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Authentication can use:</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>something you know</b> – password or PIN</li>
							<li><b>something you have</b> – phone, token, card</li>
							<li><b>something unique to you</b> – biometrics</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Passwords</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Strong passwords should use capitals, numbers and symbols</li>
							<li>Passwords should be changed regularly</li>
							<li>Do not use easy personal details such as birthdays or pet names</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Biometrics</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Biometric</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main points</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Fingerprint scan</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Unique ridges/valleys; easy to use; can fail if skin damaged</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Retina scan</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Very accurate; expensive and intrusive</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Face recognition</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Non-intrusive; affected by lighting, age, glasses</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Voice recognition</td><td class="px-3 py-2.5 text-sm text-cs-ok">Fast and cheap; lower accuracy; affected by illness and recordings</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Two-step verification</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Two-step verification</b> uses two methods of authentication, for example a password plus a one-time code sent to a mobile phone.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Firewalls, proxy servers and SSL</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Firewall</b> filters traffic between a computer/network and the internet</li>
							<li><b>Proxy server</b> stands between the user and the internet; can filter websites and hide internal IP addresses</li>
							<li><b>SSL</b> encrypts data transmitted over the internet and helps create secure connections such as HTTPS</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-4'}
					<Flashcards
						title="Flashcards"
						badges={['Question / Answer', 'Loaded from JSON', 'Chapter 5 only']}
						chapterKey="chapter5"
						chapterLabel="Chapter 5"
					/>
				{:else}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">Quick Memorise List</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Fast recap</span><span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Before exam</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Must-know definitions</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Internet</b>: worldwide infrastructure of interconnected networks</li>
							<li><b>WWW</b>: collection of websites and web pages accessed via the internet</li>
							<li><b>URL</b>: text-based address for a web page</li>
							<li><b>HTTP</b>: protocol for transferring web files</li>
							<li><b>HTTPS</b>: secure version of HTTP</li>
							<li><b>Cookie</b>: small file/code stored by websites on a user device</li>
							<li><b>Digital currency</b>: money that exists only electronically</li>
							<li><b>Blockchain</b>: decentralised digital ledger of linked, time-stamped records</li>
							<li><b>Brute-force attack</b>: trying many password combinations</li>
							<li><b>DDoS</b>: flooding a target with traffic so it cannot cope</li>
							<li><b>Phishing</b>: tricking users with fake messages/emails</li>
							<li><b>Pharming</b>: redirecting users to fake websites</li>
							<li><b>Social engineering</b>: manipulating people into breaking security rules</li>
							<li><b>Two-step verification</b>: two authentication methods</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Exam favourites</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Difference between internet and WWW</li>
							<li>Parts of a URL</li>
							<li>How DNS helps retrieve a web page</li>
							<li>Session vs persistent cookies</li>
							<li>How blockchain links blocks together</li>
							<li>Differences between digital currency and cryptocurrency</li>
							<li>Threats: brute force, DDoS, malware, phishing, pharming, social engineering</li>
							<li>Strong password rules</li>
							<li>Biometric pros and cons</li>
							<li>How firewalls, proxy servers and SSL protect data</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Ultra-fast recap</h3>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">
							Internet = infrastructure. WWW = websites and web pages. URL locates a page. Browser asks DNS for IP address, connects to web server, receives HTML and displays the page. Cookies remember preferences and sessions. Digital currency exists electronically; blockchain tracks transactions using linked blocks and hashes. Cyber threats include brute force, interception, DDoS, hacking, malware, phishing, pharming and social engineering. Protection includes access levels, anti-malware, strong authentication, updates, careful checking of emails/URLs, firewalls, proxy servers and SSL.
						</div>
					</section>
				{/if}
			</main>
		</div>
	</div>
</div>
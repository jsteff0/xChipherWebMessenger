<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();

	const terminalTitle = $derived(
		page.url.pathname === '/'
			? 'secure_channel.sh'
			: page.url.pathname.replace(/^\/|\/$/g, '').replaceAll('/', '_') + '.sh'
	);
</script>

<main class="terminal-screen min-h-screen bg-[#050505] p-4 font-mono text-[#00ff41] md:p-8">
	<div class="scanline-overlay"></div>
	<div class="scanline-beam"></div>
	<div class="terminal-ambient"></div>

	<section
		class="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-3xl items-center md:min-h-[calc(100vh-4rem)]"
	>
		<div class="w-full">
			<div
				class="flex items-center gap-2 rounded-t-lg border border-b-0 border-[#00ff41]/20 bg-[#0d0d0d] px-4 py-2"
			>
				<div class="flex gap-1.5">
					<a
						class="h-3 w-3 rounded-full bg-[#ff5f57] transition hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-[#ff5f57]/60"
						href="/"
						aria-label="Close terminal and return to main page"
					></a>
					<div class="h-3 w-3 rounded-full bg-[#ffbd2e]" aria-hidden="true"></div>
					<div class="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true"></div>
				</div>
				<a class="ml-3 min-w-0 truncate text-xs tracking-wider text-[#00ff41]/60" href="/">
					root@darknet:~/{terminalTitle}
				</a>
				<span class="ml-auto hidden text-xs text-[#00ff41]/30 phone:inline">PID 31337</span>
			</div>

			<div
				class="terminal-body min-h-[70vh] max-h-[80vh] overflow-y-auto rounded-b-lg border border-t-[#00ff41]/10 border-[#00ff41]/20 bg-[#0a0a0a] p-4 shadow-[0_0_40px_rgba(0,255,65,0.08)]"
			>
				{@render children()}
			</div>
		</div>
	</section>
</main>

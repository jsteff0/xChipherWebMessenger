<script lang="ts">
	import { page } from '$app/state';

	const status = $derived(page.status || 404);
	const message = $derived(page.error?.message || 'route not found');
</script>

<svelte:head>
	<title>{status} | XCipherLab</title>
	<meta name="description" content="XCipherLab terminal error page." />
</svelte:head>

<section class="terminal-panel mx-auto max-w-2xl">
	<p class="terminal-kicker">route failure</p>
	<h1 class="terminal-heading">{status}: SIGNAL LOST</h1>

	<div class="mt-6 space-y-2 text-sm text-[#00ff41]/70">
		<p class="terminal-glow">&gt; requested endpoint could not be resolved</p>
		<p>&gt; status: {status}</p>
		<p>&gt; reason: {message}</p>
		<p>&gt; recovery routes available</p>
	</div>

	<div class="mt-6 grid gap-2 sm:grid-cols-2">
		<a class="terminal-button text-center" href="/">MAIN TERMINAL</a>
		<a class="terminal-button text-center" href="/playground/">PLAYGROUND</a>
	</div>

	<div class="mt-6 rounded border border-[#00ff41]/15 bg-black/30 px-3 py-2 text-sm text-[#00ff41]/70">
		<span class="terminal-glow">[xcipher@engine ~]$</span>
		<span>recover --route /</span>
		<span class="cursor-blink">_</span>
	</div>
</section>

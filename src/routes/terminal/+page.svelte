<script lang="ts">
	import { page } from '$app/state';
	import CyberTerminal from '$lib/terminal/CyberTerminal.svelte';

	const terminalCommand = $derived(page.url.searchParams.get('cmd') ?? '');
</script>

<svelte:head>
	<title>XCipher Terminal</title>
	<meta name="description" content="XCipher atmospheric command terminal." />
</svelte:head>

<div class="terminal-playground space-y-5">
	<header class="terminal-panel">
		<p class="terminal-kicker">standalone console</p>
		<h1 class="terminal-heading">XCIPHER TERMINAL</h1>
		<p class="mt-2 max-w-2xl text-sm text-[#00ff41]/55">
			Pseudo-terminal command layer for diagnostics, visual effects, and navigation. Start with -help.
		</p>
	</header>

	<CyberTerminal initialCommand={terminalCommand} autoOpen={true} embedded={true} />
</div>

<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { browser } from '$app/environment';
	import { terminalCommands, type TerminalEffect, type TerminalOutput } from './commands';
	import { commandMatches, findCommandSuggestions, normalizeCommand } from './parser';

	type Entry = {
		id: number;
		role: 'system' | 'command' | 'output';
		command?: string;
		output?: TerminalOutput;
	};

	let {
		initialCommand = '',
		autoOpen = false,
		embedded = false
	}: { initialCommand?: string; autoOpen?: boolean; embedded?: boolean } = $props();

	let open = $state(autoOpen);
	let compact = $state(!autoOpen && !embedded);
	let input = $state('');
	let entries = $state<Entry[]>([
		{ id: 1, role: 'system', output: { type: 'text', value: 'XCIPHER console ready. Type -help.' } }
	]);
	let history = $state<string[]>([]);
	let historyIndex = $state(-1);
	let suggestionIndex = $state(0);
	let executing = $state(false);
	let activePanel = $state<'about' | 'cipher' | null>(null);
	let activeEffect = $state<TerminalEffect | null>(null);
	let copiedKey = $state('');
	let terminalBody = $state<HTMLDivElement>();
	let commandInput = $state<HTMLInputElement>();
	let effectTimer: ReturnType<typeof setTimeout> | undefined;
	let timers: ReturnType<typeof setTimeout>[] = [];
	let entryId = 2;

	const commandNames = terminalCommands
		.flatMap((command) => [command.name, ...(command.aliases ?? [])])
		.sort((a, b) => a.localeCompare(b));

	let suggestions = $derived(findCommandSuggestions(input, commandNames));

	onMount(() => {
		if (initialCommand) {
			open = true;
			compact = false;
			timers.push(setTimeout(() => executeCommand(initialCommand), 320));
		}

		if (open) timers.push(setTimeout(() => commandInput?.focus(), 80));
	});

	onDestroy(() => {
		timers.forEach(clearTimeout);
		if (effectTimer) clearTimeout(effectTimer);
	});

	function append(entry: Omit<Entry, 'id'>) {
		entries = [...entries, { ...entry, id: entryId++ }];
		scrollToBottom();
	}

	function appendOutput(output: TerminalOutput[]) {
		output.forEach((item) => append({ role: 'output', output: item }));
	}

	async function scrollToBottom() {
		await tick();
		if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
	}

	function toggleOpen() {
		open = !open;
		compact = !open;
		if (open) timers.push(setTimeout(() => commandInput?.focus(), 80));
	}

	function openPanel(panel: 'about' | 'cipher') {
		activePanel = panel;
	}

	function triggerEffect(effect: TerminalEffect, duration: number) {
		activeEffect = effect;
		if (effectTimer) clearTimeout(effectTimer);
		effectTimer = setTimeout(() => {
			activeEffect = null;
		}, duration);
	}

	async function executeCommand(rawCommand = input) {
		const submitted = rawCommand.trim();
		if (!submitted || executing) return;

		input = '';
		suggestionIndex = 0;
		history = [...history, submitted];
		historyIndex = -1;
		append({ role: 'command', command: submitted });

		const command = terminalCommands.find((candidate) =>
			commandMatches(submitted, candidate.name, candidate.aliases)
		);

		if (!command) {
			appendOutput([{ type: 'text', value: `command not found: ${submitted}`, muted: true }]);
			return;
		}

		executing = true;
		const result = command.run(submitted, {
			history,
			openPanel,
			triggerEffect,
			now: () => new Date()
		});

		await wait(result.delay ?? command.delay ?? 120);

		if (result.clear) {
			entries = [];
			executing = false;
			return;
		}

		if (result.output) appendOutput(result.output);

		if (result.effect) {
			triggerEffect(result.effect.name, result.effect.duration);
			if (result.effect.done) {
				timers.push(
					setTimeout(() => appendOutput([{ type: 'text', value: result.effect?.done ?? '' }]), result.effect.duration)
				);
			}
		}

		if (result.stream) {
			for (const output of result.stream) {
				await wait(360);
				appendOutput(output);
			}
		}

		await result.after?.();
		executing = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			executeCommand();
		}

		if (event.key === 'Tab') {
			event.preventDefault();
			const selected = suggestions[suggestionIndex] ?? suggestions[0];
			if (selected) input = selected;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (suggestions.length && input) {
				suggestionIndex = Math.max(0, suggestionIndex - 1);
				return;
			}
			if (!history.length) return;
			historyIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
			input = history[historyIndex];
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (suggestions.length && input) {
				suggestionIndex = Math.min(suggestions.length - 1, suggestionIndex + 1);
				return;
			}
			if (historyIndex < 0) return;
			historyIndex = Math.min(history.length, historyIndex + 1);
			input = historyIndex >= history.length ? '' : history[historyIndex];
		}
	}

	async function copyKey(value: string) {
		if (!browser) return;
		await navigator.clipboard.writeText(value);
		copiedKey = value;
		timers.push(setTimeout(() => (copiedKey = ''), 1300));
	}

	function shareCommand(command: string) {
		if (!browser) return;
		const url = new URL('/terminal', window.location.origin);
		url.searchParams.set('cmd', command);
		navigator.clipboard?.writeText(url.toString());
	}

	function closeModalFromBackdrop(event: MouseEvent | KeyboardEvent) {
		if (event.currentTarget === event.target) activePanel = null;
	}

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<div
	class:terminal-console-shell={!embedded}
	class:terminal-console-embedded={embedded}
	class:terminal-console-glitch={activeEffect === 'glitch'}
>
	{#if activeEffect === 'matrix'}
		<div class="terminal-matrix" aria-hidden="true">
			{#each Array(18) as _, index}
				<span style={`left:${index * 5.8}%; animation-delay:${(index % 6) * 0.22}s;`}>
					XC01<br />7A9F<br />10EC<br />42AB
				</span>
			{/each}
		</div>
	{/if}

	{#if !embedded}
		<button class="terminal-console-launcher" type="button" onclick={toggleOpen} aria-expanded={open}>
			<span class="h-2 w-2 rounded-full bg-[#00ff41] shadow-[0_0_12px_rgba(0,255,65,0.75)]"></span>
			<span>{open ? 'CLOSE CONSOLE' : 'OPEN CONSOLE'}</span>
		</button>
	{/if}

	{#if open || embedded}
		<section class:terminal-console-panel={!embedded} class:terminal-console-panel-embedded={embedded}>
			<header class="terminal-console-header">
				<div>
					<p class="terminal-kicker">command system</p>
					<h2 class="terminal-subheading">XCIPHER CONSOLE</h2>
				</div>
				<div class="flex items-center gap-2">
					<span class="terminal-console-chip">LOCAL ONLY</span>
					{#if !embedded}
						<button class="terminal-console-icon" type="button" onclick={toggleOpen} aria-label="Close console">×</button>
					{/if}
				</div>
			</header>

			<div bind:this={terminalBody} class="terminal-console-body">
				{#each entries as entry, index (entry.id)}
					<div class="terminal-console-line" style={`animation-delay:${Math.min(index, 8) * 35}ms;`}>
						{#if entry.role === 'command'}
							<span class="terminal-console-prompt">[xcipher@engine ~]$</span>
							<span class="text-[#eefff2]/90">{entry.command}</span>
						{:else if entry.output}
							{#if entry.output.type === 'heading'}
								<p class="terminal-console-heading">{entry.output.value}</p>
							{:else if entry.output.type === 'text'}
								<p class:terminal-console-muted={entry.output.muted}>{entry.output.value}</p>
							{:else if entry.output.type === 'list'}
								<div class="terminal-command-list">
									{#each entry.output.rows as row, rowIndex}
										<div style={`animation-delay:${rowIndex * 28}ms;`}>
											<strong>{row.command}</strong>
											<span>{row.description}</span>
										</div>
									{/each}
								</div>
							{:else if entry.output.type === 'progress'}
								<div class="terminal-progress">
									<div class="flex items-center justify-between">
										<span>{entry.output.label}</span>
										<span>{entry.output.value}%</span>
									</div>
									<div><span style={`width:${entry.output.value}%`}></span></div>
								</div>
							{:else if entry.output.type === 'meter'}
								<div class="terminal-meter">
									<div class="flex items-center justify-between">
										<span>{entry.output.label}</span>
										<strong>{entry.output.detail}</strong>
									</div>
									<div><span style={`width:${entry.output.value}%`}></span></div>
								</div>
							{:else if entry.output.type === 'key'}
								<div class="terminal-key-output">
									<code>{entry.output.value}</code>
									<button type="button" onclick={() => copyKey(entry.output?.type === 'key' ? entry.output.value : '')}>
										{copiedKey === entry.output.value ? 'COPIED' : 'COPY'}
									</button>
									<button type="button" onclick={() => shareCommand('-random_key')}>SHARE</button>
								</div>
							{:else if entry.output.type === 'ascii'}
								<pre class="terminal-ascii">{entry.output.lines.join('\n')}</pre>
							{/if}
						{/if}
					</div>
				{/each}
				{#if executing}
					<p class="terminal-console-muted">executing<span class="cursor-blink">_</span></p>
				{/if}
			</div>

			<div class="terminal-console-input-wrap">
				<div class="terminal-console-input">
					<span>[xcipher@engine ~]$</span>
					<input
						bind:this={commandInput}
						bind:value={input}
						onkeydown={onKeydown}
						placeholder="type command..."
						autocomplete="off"
						spellcheck="false"
						disabled={executing}
					/>
					<span class="terminal-input-cursor" aria-hidden="true"></span>
				</div>
				{#if suggestions.length && input}
					<div class="terminal-suggestions">
						{#each suggestions as suggestion, index}
							<button
								type="button"
								class:terminal-suggestion-active={index === suggestionIndex}
								onclick={() => {
									input = suggestion;
									commandInput?.focus();
								}}
							>
								<span>{suggestion}</span>
								<small>{terminalCommands.find((command) => normalizeCommand(command.name) === normalizeCommand(suggestion))?.description ?? 'alias'}</small>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	{/if}

	{#if activePanel}
		<div
			class="terminal-modal-backdrop"
			role="button"
			tabindex="0"
			aria-label="Close terminal information panel"
			onclick={closeModalFromBackdrop}
			onkeydown={(event) => {
				if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') closeModalFromBackdrop(event);
			}}
		>
			<section class="terminal-modal" role="dialog" aria-modal="true">
				<header class="flex items-start justify-between gap-4">
					<div>
						<p class="terminal-kicker">{activePanel === 'about' ? 'information panel' : 'cipher architecture'}</p>
						<h2 class="terminal-subheading">{activePanel === 'about' ? 'ABOUT XCIPHER' : 'XCIPHER CORE'}</h2>
					</div>
					<button class="terminal-console-icon" type="button" onclick={() => (activePanel = null)} aria-label="Close panel">×</button>
				</header>
				{#if activePanel === 'about'}
					<p>
						XCipher is an experimental AES-inspired encryption playground focused on visualizing key flow,
						round stages, and ciphertext transformation in a compact cyber-console interface.
					</p>
				{:else}
					<p>
						The playground presents plaintext, substitution, bit shifting, byte swapping, round key mixing,
						and ciphertext as visible stages. This command panel only opens the view; it does not alter the
						encryption implementation.
					</p>
				{/if}
			</section>
		</div>
	{/if}
</div>

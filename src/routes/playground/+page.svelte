<script lang="ts">
	import { onMount, tick } from 'svelte';
	import CyberTerminal from '$lib/terminal/CyberTerminal.svelte';
	import { decrypt, encrypt } from '$lib/main';

	type Mode = 'encrypt' | 'decrypt';

	const stages = ['PLAINTEXT', 'SUBSTITUTE', 'BITSHIFT', 'SWAPBYTES', 'ROUND KEY MIX', 'CIPHERTEXT'];
	const idleLogs = [
		'> engine heartbeat: nominal',
		'> key schedule cache ready',
		'> block buffer standing by',
		'> secure window active'
	];

	const bootLines = [
		'> resolving module: xcipher/playground',
		'> allocating isolated app window',
		'> binding encryption engine',
		'> loading interface controls',
		'> playground ready'
	];

	let mode: Mode = 'encrypt';
	let key = '';
	let plaintext = '';
	let ciphertext = '';
	let output = '';
	let activeStage = -1;
	let processing = false;
	let timing = '0.0ms';
	let logPanel: HTMLDivElement;
	let logs = ['> launching XCipher Playground...', '> engine ready'];
	let loading = true;
	let visibleBootLines: string[] = [];
	let timers: ReturnType<typeof setTimeout>[] = [];
	let terminalCommand = '';
	let terminalAutoOpen = false;

	$: keyValid = /^[0-9a-fA-F]{32}$/.test(key);
	$: inputValue = mode === 'encrypt' ? plaintext : ciphertext;
	$: inputLabel = mode === 'encrypt' ? 'PLAINTEXT' : 'CIPHERTEXT';
	$: outputLabel = mode === 'encrypt' ? 'CIPHERTEXT' : 'PLAINTEXT';
	$: blockCount = Math.max(1, Math.ceil(inputValue.length / (mode === 'encrypt' ? 16 : 32)));

	onMount(() => {
		terminalCommand = new URLSearchParams(window.location.search).get('cmd') ?? '';
		terminalAutoOpen = Boolean(terminalCommand);

		bootLines.forEach((line, index) => {
			const timer = setTimeout(() => {
				visibleBootLines = [...visibleBootLines, line];
				if (index === bootLines.length - 1) {
					timers.push(
						setTimeout(() => {
							loading = false;
						}, 550)
					);
				}
			}, 260 + index * 430);

			timers.push(timer);
		});

		return () => timers.forEach(clearTimeout);
	});

	function switchMode(nextMode: Mode) {
		mode = nextMode;
		output = '';
		activeStage = -1;
		addLog(`> mode set: ${nextMode}`);
	}

	async function runCipher() {
		if (processing) return;
		if (!keyValid) {
			addLog('> rejected: key must be 32 hex characters');
			return;
		}
		if (!inputValue.trim()) {
			addLog(`> rejected: ${inputLabel.toLowerCase()} buffer is empty`);
			return;
		}

		processing = true;
		output = '';
		const started = performance.now();
		addLog(`> command: xcipher ${mode} --rounds 5`);
		addLog('> generating round keys...');

		for (let i = 0; i < stages.length; i++) {
			activeStage = i;
			addLog(`> ${stages[i].toLowerCase()}...`);
			await wait(145);
		}

		const result = mode === 'encrypt' ? encrypt(plaintext, key) : decrypt(ciphertext, key);
		timing = `${(performance.now() - started).toFixed(1)}ms`;
		output = result || 'Error has occurred :(';
		addLog(`> ${mode} completed in ${timing}`);
		activeStage = -1;
		processing = false;
	}

	function updateInput(value: string) {
		if (mode === 'encrypt') {
			plaintext = value;
		} else {
			ciphertext = value;
		}
	}

	function randomKey() {
		const bytes = crypto.getRandomValues(new Uint8Array(16));
		key = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
		addLog('> random key injected');
	}

	async function copyOutput() {
		if (!output) return;
		await navigator.clipboard.writeText(output);
		addLog('> output copied');
	}

	function clearAll() {
		plaintext = '';
		ciphertext = '';
		output = '';
		activeStage = -1;
		addLog('> buffers cleared');
	}

	function pingEngine() {
		addLog(idleLogs[Math.floor(Math.random() * idleLogs.length)]);
	}

	async function addLog(line: string) {
		logs = [...logs.slice(-8), line];
		await tick();
		if (logPanel) logPanel.scrollTop = logPanel.scrollHeight;
	}

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<svelte:head>
	<title>XCipher Playground</title>
	<meta name="description" content="XCipher terminal playground for encryption and decryption." />
</svelte:head>

{#if loading}
	<div class="terminal-panel min-h-[55vh]">
		<p class="terminal-kicker">boot sequence</p>
		<h1 class="terminal-heading">OPENING PLAYGROUND WINDOW</h1>
		<div class="mt-6 space-y-2 text-sm text-[#00ff41]/70">
			{#each visibleBootLines as line}
				<p class="terminal-glow">{line}</p>
			{/each}
			<span class="cursor-blink text-[#00ff41]">_</span>
		</div>
	</div>
{:else}
<div class="terminal-playground space-y-5">
	<header class="terminal-panel">
		<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p class="terminal-kicker">module loaded</p>
				<h1 class="terminal-heading">XCIPHER PLAYGROUND</h1>
				<p class="mt-2 max-w-2xl text-sm text-[#00ff41]/55">
					Interactive encryption window for the custom AES-inspired cipher.
				</p>
			</div>

			<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
				<div class="terminal-status" class:terminal-status-ok={keyValid}>
					<span>KEY</span>
					<strong>{keyValid ? 'VALID' : 'WAITING'}</strong>
				</div>
				<div class="terminal-status">
					<span>BLOCK</span>
					<strong>128 BIT</strong>
				</div>
				<div class="terminal-status">
					<span>ROUNDS</span>
					<strong>5</strong>
				</div>
				<div class="terminal-status">
					<span>MODE</span>
					<strong>{mode.toUpperCase()}</strong>
				</div>
			</div>
		</div>
	</header>

	<section class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]">
		<div class="terminal-panel">
			<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p class="terminal-kicker">input buffer</p>
					<h2 class="terminal-subheading">{inputLabel}</h2>
				</div>

				<div class="terminal-toggle">
					<button class:terminal-toggle-active={mode === 'encrypt'} type="button" onclick={() => switchMode('encrypt')}>
						ENCRYPT
					</button>
					<button class:terminal-toggle-active={mode === 'decrypt'} type="button" onclick={() => switchMode('decrypt')}>
						DECRYPT
					</button>
				</div>
			</div>

			<label class="terminal-label" for="cipher-key">KEY MATERIAL</label>
			<div class="mb-4 flex flex-col gap-2 sm:flex-row">
				<input
					id="cipher-key"
					bind:value={key}
					maxlength="32"
					class="terminal-input"
					type="text"
					placeholder="32 hex chars"
					spellcheck="false"
					autocomplete="off"
				/>
				<button class="terminal-button" type="button" onclick={randomKey}>RANDOM KEY</button>
			</div>

			<label class="terminal-label" for="cipher-input">{inputLabel}</label>
			<textarea
				id="cipher-input"
				value={inputValue}
				oninput={(event) => updateInput(event.currentTarget.value)}
				class="terminal-textarea min-h-[220px]"
				placeholder={mode === 'encrypt' ? 'type plaintext payload...' : 'paste ciphertext hex...'}
				spellcheck="false"
			></textarea>

			<div class="mt-4 flex flex-wrap gap-2">
				<button class="terminal-button terminal-button-primary" type="button" onclick={runCipher} disabled={processing}>
					{processing ? 'RUNNING...' : mode === 'encrypt' ? 'ENCRYPT' : 'DECRYPT'}
				</button>
				<button class="terminal-button" type="button" onclick={clearAll}>CLEAR</button>
				<button class="terminal-button" type="button" onclick={pingEngine}>PING</button>
			</div>
		</div>

		<div class="terminal-panel">
			<p class="terminal-kicker text-center">pipeline</p>
			<div class="mt-4 space-y-2">
				{#each stages as stage, index}
					<div class="terminal-stage" class:terminal-stage-active={activeStage === index}>
						<span>{String(index + 1).padStart(2, '0')}</span>
						<strong>{mode === 'decrypt' ? stages[stages.length - 1 - index] : stage}</strong>
					</div>
					{#if index < stages.length - 1}
						<div class="terminal-pipe" class:terminal-pipe-active={activeStage > index}></div>
					{/if}
				{/each}
			</div>
		</div>

		<div class="terminal-panel">
			<div class="mb-4 flex items-center justify-between gap-3">
				<div>
					<p class="terminal-kicker">output buffer</p>
					<h2 class="terminal-subheading">{outputLabel}</h2>
				</div>
				<button class="terminal-button" type="button" onclick={copyOutput} disabled={!output}>COPY</button>
			</div>

			<textarea
				readonly
				class="terminal-textarea min-h-[286px]"
				value={output}
				placeholder="result will appear here..."
			></textarea>

			<div class="mt-4 grid grid-cols-2 gap-2">
				<div class="terminal-status">
					<span>TIME</span>
					<strong>{timing}</strong>
				</div>
				<div class="terminal-status">
					<span>BLOCKS</span>
					<strong>{blockCount}</strong>
				</div>
			</div>
		</div>
	</section>

	<section class="terminal-panel">
		<div class="mb-3 flex items-center justify-between">
			<div>
				<p class="terminal-kicker">system log</p>
				<h2 class="terminal-subheading">ENGINE TELEMETRY</h2>
			</div>
			<span class="h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_16px_rgba(0,255,65,0.8)]"></span>
		</div>

		<div bind:this={logPanel} class="terminal-log">
			{#each logs as log}
				<p>{log}</p>
			{/each}
			<span class="cursor-blink">_</span>
		</div>
	</section>

	<CyberTerminal initialCommand={terminalCommand} autoOpen={terminalAutoOpen} />
</div>
{/if}

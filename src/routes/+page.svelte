<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import CyberTerminal from '$lib/terminal/CyberTerminal.svelte';

	type Sender = 'SYSTEM' | 'alice' | 'bob' | 'you';

	type TerminalMessage = {
		sender: Sender;
		message: string;
		href?: string;
		isUser?: boolean;
		displayed?: string;
		done?: boolean;
	};

	const bootLines = [
		{ text: 'XCIPHER TERMINAL v4.2.0 - CLASSIFIED', delay: 0 },
		{ text: 'Initializing encrypted channel...', delay: 400 },
		{ text: 'Routing through 7 proxy nodes...', delay: 900 },
		{ text: 'TOR circuit established [OK]', delay: 1500 },
		{ text: 'xCipher protocol active [OK]', delay: 1900 },
		{ text: 'Connection secure. Channel open.', delay: 2400 },
		{ text: '-----------------------------------------', delay: 2900 }
	];

	const chatScript: TerminalMessage[] = [
		{ sender: 'SYSTEM', message: 'Two operatives have joined the channel.' },
		{ sender: 'alice', message: 'Connection verified. Welcome to XCipherLab.' },
		{ sender: 'bob', message: 'Here are the main project links loaded into this terminal.' },
		{ sender: 'alice', message: 'XCipherLab Telegram', href: 'https://t.me/XCipherLab' },
		{ sender: 'bob', message: 'XCipherLab Instagram', href: 'https://www.instagram.com/xcipherlab/' },
		{ sender: 'alice', message: 'GitHub of xCipher', href: 'https://github.com/jsteff0/xCipher' },
		{ sender: 'bob', message: 'xCipher API', href: 'https://github.com/jsteff0/xChipherWebMessenger' },
		{ sender: 'alice', message: 'xCipher Playground', href: '/playground/' },
		{ sender: 'SYSTEM', message: 'Briefing complete. Terminal ready for input.' }
	];

	const replies: TerminalMessage[] = [
		{ sender: 'alice', message: 'Interesting. I will keep that in the channel log.' },
		{ sender: 'bob', message: 'Copy. The link matrix is online and ready.' },
		{ sender: 'alice', message: 'The system is responding normally. You are clear.' },
		{ sender: 'bob', message: 'Affirmative. xCipher services are standing by.' },
		{ sender: 'alice', message: 'Data streams look clean. No anomalies detected.' },
		{ sender: 'bob', message: 'Roger that. Terminal remains open.' }
	];

	let bootDone = false;
	let scriptDone = false;
	let visibleBootLines: string[] = [];
	let messages: TerminalMessage[] = [];
	let inputValue = '';
	let replyIndex = 0;
	let chatContent: HTMLDivElement;
	let inputElement: HTMLInputElement;
	let launchingPlayground = false;
	let openingExternalLink = false;
	let timers: ReturnType<typeof setTimeout>[] = [];
	let intervals: ReturnType<typeof setInterval>[] = [];
	let terminalCommand = '';
	let terminalAutoOpen = false;

	onMount(() => {
		terminalCommand = new URLSearchParams(window.location.search).get('cmd') ?? '';
		terminalAutoOpen = Boolean(terminalCommand);
		startBootSequence();

		return () => {
			timers.forEach(clearTimeout);
			intervals.forEach(clearInterval);
		};
	});

	function startBootSequence() {
		bootLines.forEach((line, index) => {
			const timer = setTimeout(() => {
				visibleBootLines = [...visibleBootLines, line.text];

				if (index === bootLines.length - 1) {
					timers.push(
						setTimeout(() => {
							bootDone = true;
							addTypedMessage(chatScript[0], 0);
						}, 600)
					);
				}
			}, line.delay);

			timers.push(timer);
		});
	}

	function addTypedMessage(message: TerminalMessage, index: number) {
		messages = [...messages, { ...message, displayed: '', done: false }];
		scrollToBottom();

		let characterIndex = 0;
		const interval = setInterval(() => {
			const nextMessages = [...messages];
			const current = nextMessages[nextMessages.length - 1];
			characterIndex += 1;
			current.displayed = message.message.slice(0, characterIndex);

			if (characterIndex >= message.message.length) {
				clearInterval(interval);
				current.done = true;

				if (index + 1 < chatScript.length) {
					timers.push(setTimeout(() => addTypedMessage(chatScript[index + 1], index + 1), 180));
				} else {
					scriptDone = true;
					timers.push(setTimeout(() => inputElement?.focus(), 50));
				}
			}

			messages = nextMessages;
			scrollToBottom();
		}, 20);

		intervals.push(interval);
	}

	function submitInput() {
		const text = inputValue.trim();
		if (!text) return;

		inputValue = '';
		messages = [...messages, { sender: 'you', message: text, displayed: text, done: true, isUser: true }];
		scrollToBottom();

		if (runTypedCommand(text)) return;

		timers.push(
			setTimeout(() => {
				const reply = replies[replyIndex % replies.length];
				replyIndex += 1;
				messages = [...messages, { ...reply, displayed: '', done: false }];
				typeLatestReply(reply);
			}, 800)
		);
	}

	function runTypedCommand(text: string) {
		const command = normalizeCommand(text);

		if (command === '-help') {
			timers.push(
				setTimeout(() => {
					appendSystemLines([
						'available commands:',
						'-help',
						'-clear',
						'-playground',
						'-links'
					]);
				}, 350)
			);
			return true;
		}

		if (command === '-clear') {
			timers.push(
				setTimeout(() => {
					visibleBootLines = [];
					messages = [{ sender: 'SYSTEM', message: 'terminal cleared', displayed: 'terminal cleared', done: true }];
					scrollToBottom();
				}, 250)
			);
			return true;
		}

		if (command === '-playground' || command === '-open playground' || command === './launch playground --window') {
			timers.push(setTimeout(() => beginPlaygroundTransition(), 350));
			return true;
		}

		if (command === '-links') {
			timers.push(
				setTimeout(() => {
					appendSystemLines([
						'loaded links:',
						'telegram -> https://t.me/XCipherLab',
						'instagram -> https://www.instagram.com/xcipherlab/',
						'github -> https://github.com/jsteff0/xCipher',
						'playground -> /playground/'
					]);
				}, 350)
			);
			return true;
		}

		return false;
	}

	async function launchPlayground() {
		if (launchingPlayground) return;

		launchingPlayground = true;
		inputValue = '';
		await typePromptCommand('./launch playground --window');

		messages = [
			...messages,
			{
				sender: 'you',
				message: inputValue,
				displayed: inputValue,
				done: true,
				isUser: true
			}
		];
		inputValue = '';
		scrollToBottom();

		await beginPlaygroundTransition();
	}

	async function beginPlaygroundTransition() {
		await wait(450);
		messages = [
			{ sender: 'SYSTEM', message: 'resolving module: xcipher/playground', displayed: 'resolving module: xcipher/playground', done: true },
			{ sender: 'SYSTEM', message: 'mounting isolated application window', displayed: 'mounting isolated application window', done: true },
			{ sender: 'SYSTEM', message: 'loading engine interface...', displayed: 'loading engine interface...', done: true }
		];
		visibleBootLines = [];
		scrollToBottom();

		await wait(950);
		messages = [
			{
				sender: 'SYSTEM',
				message: 'launching XCipher Playground...',
				displayed: 'launching XCipher Playground...',
				done: true
			}
		];
		scrollToBottom();

		await wait(650);
		goto('/playground/');
	}

	function appendSystemLines(lines: string[]) {
		messages = [
			...messages,
			...lines.map((line) => ({
				sender: 'SYSTEM' as const,
				message: line,
				displayed: line,
				done: true
			}))
		];
		scrollToBottom();
	}

	async function openExternalLink(href: string) {
		if (openingExternalLink) return;

		openingExternalLink = true;
		const target = new URL(href);
		inputValue = '';
		await typePromptCommand(`open --external ${target.hostname}`);

		messages = [
			...messages,
			{
				sender: 'you',
				message: inputValue,
				displayed: inputValue,
				done: true,
				isUser: true
			}
		];
		inputValue = '';
		scrollToBottom();

		await wait(350);
		messages = [
			...messages,
			{
				sender: 'SYSTEM',
				message: `checking external route: ${target.hostname}`,
				displayed: `checking external route: ${target.hostname}`,
				done: true
			},
			{
				sender: 'SYSTEM',
				message: 'opening secure browser handoff...',
				displayed: 'opening secure browser handoff...',
				done: true
			}
		];
		scrollToBottom();

		await wait(650);
		const openedWindow = window.open(href, '_blank', 'noopener,noreferrer');
		messages = [
			...messages,
			{
				sender: 'SYSTEM',
				message: openedWindow ? 'external link opened' : 'popup blocked: allow popups for this site',
				displayed: openedWindow ? 'external link opened' : 'popup blocked: allow popups for this site',
				done: true
			}
		];
		openingExternalLink = false;
		scrollToBottom();
		timers.push(setTimeout(() => inputElement?.focus(), 50));
	}

	function handleLinkClick(event: MouseEvent, message: TerminalMessage) {
		if (!message.href) return;

		if (message.href === '/playground/') {
			event.preventDefault();
			launchPlayground();
			return;
		}

		if (message.href.startsWith('http')) {
			event.preventDefault();
			openExternalLink(message.href);
		}
	}

	async function typePromptCommand(command: string) {
		for (const char of command) {
			inputValue += char;
			await wait(24);
		}
	}

	function typeLatestReply(reply: TerminalMessage) {
		let characterIndex = 0;
		const interval = setInterval(() => {
			const nextMessages = [...messages];
			const current = nextMessages[nextMessages.length - 1];
			characterIndex += 1;
			current.displayed = reply.message.slice(0, characterIndex);

			if (characterIndex >= reply.message.length) {
				clearInterval(interval);
				current.done = true;
				timers.push(setTimeout(() => inputElement?.focus(), 50));
			}

			messages = nextMessages;
			scrollToBottom();
		}, 20);

		intervals.push(interval);
	}

	function scrollToBottom() {
		requestAnimationFrame(() => {
			const terminalBody = chatContent?.closest('.terminal-body');
			if (terminalBody) {
				terminalBody.scrollTop = terminalBody.scrollHeight;
			}
		});
	}

	function senderClass(sender: Sender) {
		if (sender === 'SYSTEM') return 'text-[#ffbd2e]';
		if (sender === 'alice') return 'text-[#00ff41]';
		if (sender === 'you') return 'text-[#ff5f57]';
		return 'text-[#00bfff]';
	}

	function prefix(sender: Sender) {
		return sender === 'SYSTEM' ? '[SYSTEM]' : `[${sender}@darknet]$`;
	}

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function normalizeCommand(command: string) {
		return command.trim().replace(/\s+/g, ' ').toLowerCase();
	}
</script>

<svelte:head>
	<title>XCipherLab</title>
	<meta
		name="description"
		content="XCipherLab secure terminal with project links, playground, and Euromath materials."
	/>
</svelte:head>

<div bind:this={chatContent}>
	<div class="mb-6 space-y-1 text-xs text-[#00ff41]/60">
		{#each visibleBootLines as line}
			<div class="terminal-glow opacity-70">
				{#if line.includes('[OK]')}
					{line.replace(' [OK]', '')} <span class="text-[#28c840]">[OK]</span>
				{:else}
					{line}
				{/if}
			</div>
		{/each}
	</div>

	{#if bootDone}
		<div>
			{#each messages as msg}
				<div class="mb-3 text-sm leading-relaxed">
					<span class={`${senderClass(msg.sender)} terminal-glow font-semibold`}>
						{prefix(msg.sender)}
					</span>
					<span class="text-[#00ff41]/90">
						{#if msg.href && msg.done}
							<a
								class="terminal-link"
								href={msg.href}
								target={msg.href.startsWith('http') ? '_blank' : undefined}
								rel={msg.href.startsWith('http') ? 'noreferrer' : undefined}
								onclick={(event) => handleLinkClick(event, msg)}
							>
								{msg.displayed}
							</a>
						{:else}
							{msg.displayed}
						{/if}
						{#if !msg.done}
							<span class="cursor-blink text-[#00ff41]">|</span>
						{/if}
					</span>
				</div>
			{/each}

			{#if scriptDone}
				<form
					class="mt-4 flex items-center gap-2 text-sm"
					onsubmit={(event) => {
						event.preventDefault();
						submitInput();
					}}
				>
					<label class="terminal-glow shrink-0 font-semibold text-[#00ff41]" for="terminal-input">
						[you@darknet]$
					</label>
					<input
						bind:this={inputElement}
						bind:value={inputValue}
						id="terminal-input"
						class="min-w-0 flex-1 border-none bg-transparent text-[#00ff41] caret-[#00ff41] outline-none placeholder:text-[#00ff41]/30 focus:ring-0"
						placeholder="type -help..."
						autocomplete="off"
					/>
					<span class="cursor-blink text-[#00ff41]" aria-hidden="true">|</span>
				</form>
			{/if}
		</div>
	{/if}
</div>

<CyberTerminal initialCommand={terminalCommand} autoOpen={terminalAutoOpen} />

import { goto } from '$app/navigation';

export type TerminalEffect = 'matrix' | 'glitch';

export type TerminalOutput =
	| { type: 'text'; value: string; muted?: boolean }
	| { type: 'heading'; value: string }
	| { type: 'list'; rows: { command: string; description: string }[] }
	| { type: 'progress'; label: string; value: number }
	| { type: 'key'; value: string }
	| { type: 'meter'; label: string; value: number; detail: string }
	| { type: 'ascii'; lines: string[] };

export type TerminalCommandContext = {
	history: string[];
	openPanel: (panel: 'about' | 'cipher') => void;
	triggerEffect: (effect: TerminalEffect, duration: number) => void;
	now: () => Date;
};

export type TerminalCommandResult = {
	output?: TerminalOutput[];
	stream?: TerminalOutput[][];
	delay?: number;
	clear?: boolean;
	effect?: { name: TerminalEffect; duration: number; done?: string };
	after?: () => void | Promise<void>;
};

export type TerminalCommand = {
	name: string;
	aliases?: string[];
	description: string;
	delay?: number;
	hidden?: boolean;
	run: (input: string, context: TerminalCommandContext) => TerminalCommandResult;
};

const publicRows = [
	{ command: '-help', description: 'Show available commands' },
	{ command: '-clear', description: 'Clear terminal' },
	{ command: '-history', description: 'Show command history' },
	{ command: '-status', description: 'Show engine status' },
	{ command: '-version', description: 'Show XCIPHER version' },
	{ command: '-scan', description: 'Run fake security scan' },
	{ command: '-entropy', description: 'Analyze entropy levels' },
	{ command: '-random_key', description: 'Generate random key preview' },
	{ command: '-about', description: 'Show information about XCIPHER' },
	{ command: '-cipher', description: 'Open cipher information panel' },
	{ command: '-docs', description: 'Open documentation page' },
	{ command: '-neofetch', description: 'Show system information' },
	{ command: '-matrix', description: 'Trigger temporary visual effect' },
	{ command: '-glitch', description: 'Trigger glitch animation' },
	{ command: '-ping', description: 'Fake ping test' },
	{ command: '-time', description: 'Show current time' },
	{ command: '-date', description: 'Show current date' }
];

function randomKeyPreview() {
	const bytes = crypto.getRandomValues(new Uint8Array(8));
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join('-');
}

function uptime() {
	const hours = 12 + Math.floor(Math.random() * 5);
	const minutes = 10 + Math.floor(Math.random() * 49);
	return `${hours}h ${minutes}m`;
}

export const terminalCommands: TerminalCommand[] = [
	{
		name: '-help',
		description: 'Show available commands',
		delay: 120,
		run: () => ({
			output: [{ type: 'heading', value: 'AVAILABLE COMMANDS' }, { type: 'list', rows: publicRows }]
		})
	},
	{
		name: '-clear',
		description: 'Clear terminal',
		delay: 80,
		run: () => ({ clear: true })
	},
	{
		name: '-history',
		description: 'Show command history',
		delay: 120,
		run: (_input, context) => ({
			output: context.history.length
				? context.history.map((command, index) => ({
						type: 'text',
						value: `${String(index + 1).padStart(2, ' ')}  ${command}`
					}))
				: [{ type: 'text', value: 'No command history yet.', muted: true }]
		})
	},
	{
		name: '-status',
		description: 'Show engine status',
		delay: 450,
		run: () => ({
			stream: [
				[{ type: 'text', value: '> synchronizing diagnostics...' }],
				[{ type: 'text', value: '> checking playground runtime...' }],
				[
					{ type: 'heading', value: 'XCIPHER ENGINE STATUS' },
					{ type: 'text', value: 'STATUS: OPERATIONAL' },
					{ type: 'text', value: 'ENCRYPTION CORE: ACTIVE' },
					{ type: 'text', value: 'ROUND ENGINE: ONLINE' },
					{ type: 'text', value: 'KEY SYSTEM: STABLE' },
					{ type: 'text', value: 'SECURITY LEVEL: HIGH' }
				]
			]
		})
	},
	{
		name: '-version',
		description: 'Show XCIPHER version',
		delay: 160,
		run: () => ({
			output: [
				{ type: 'text', value: 'XCIPHER ENGINE v4.2.1' },
				{ type: 'text', value: 'BUILD: STABLE' },
				{ type: 'text', value: 'PROTOCOL: XC-128' }
			]
		})
	},
	{
		name: '-scan',
		description: 'Run fake security scan',
		delay: 220,
		run: () => ({
			stream: [
				[{ type: 'text', value: '> initializing scan...' }, { type: 'progress', label: 'scan', value: 12 }],
				[{ type: 'text', value: '> checking entropy...' }, { type: 'progress', label: 'scan', value: 36 }],
				[{ type: 'text', value: '> validating key structure...' }, { type: 'progress', label: 'scan', value: 58 }],
				[{ type: 'text', value: '> scanning cipher layers...' }, { type: 'progress', label: 'scan', value: 82 }],
				[{ type: 'text', value: '> no vulnerabilities detected' }, { type: 'progress', label: 'scan', value: 100 }]
			]
		})
	},
	{
		name: '-entropy',
		description: 'Analyze entropy levels',
		delay: 300,
		run: () => ({
			output: [
				{ type: 'heading', value: 'ENTROPY ANALYSIS' },
				{ type: 'meter', label: 'Entropy Score', value: 98.2, detail: '98.2%' },
				{ type: 'text', value: 'Distribution: BALANCED' },
				{ type: 'text', value: 'Randomness Level: HIGH' }
			]
		})
	},
	{
		name: '-random_key',
		aliases: ['-keygen', '-randomkey'],
		description: 'Generate random key preview',
		delay: 180,
		run: () => ({ output: [{ type: 'key', value: randomKeyPreview() }] })
	},
	{
		name: '-about',
		description: 'Show information about XCIPHER',
		delay: 180,
		run: (_input, context) => ({
			output: [{ type: 'text', value: 'Opening XCIPHER information panel...' }],
			after: () => context.openPanel('about')
		})
	},
	{
		name: '-cipher',
		description: 'Open cipher information panel',
		delay: 180,
		run: (_input, context) => ({
			output: [{ type: 'text', value: 'Loading cipher architecture...' }],
			after: () => context.openPanel('cipher')
		})
	},
	{
		name: '-docs',
		aliases: ['-documentation'],
		description: 'Open documentation page',
		delay: 180,
		run: () => ({
			output: [{ type: 'text', value: 'Redirecting to documentation...' }],
			after: () => goto('/')
		})
	},
	{
		name: '-neofetch',
		description: 'Show system information',
		delay: 220,
		run: () => ({
			output: [
				{
					type: 'ascii',
					lines: [
						'      __  _________',
						'      \\ \\/ / ____/ /',
						'       \\  / /   / / ',
						'       / / /___/ /__',
						'      /_/\\____/____/'
					]
				},
				{ type: 'heading', value: 'XCIPHER OS' },
				{ type: 'text', value: '-------------------------' },
				{ type: 'text', value: 'ENGINE: XCIPHER' },
				{ type: 'text', value: 'VERSION: 4.2.1' },
				{ type: 'text', value: 'STATUS: ACTIVE' },
				{ type: 'text', value: 'MODE: ENCRYPTION' },
				{ type: 'text', value: `UPTIME: ${uptime()}` },
				{ type: 'text', value: 'SECURITY: MAXIMUM' }
			]
		})
	},
	{
		name: '-matrix',
		description: 'Trigger temporary visual effect',
		delay: 80,
		run: () => ({
			effect: { name: 'matrix', duration: 5000, done: 'Matrix overlay disabled.' },
			output: [{ type: 'text', value: 'Matrix overlay enabled for 5 seconds.' }]
		})
	},
	{
		name: '-glitch',
		description: 'Trigger glitch animation',
		delay: 60,
		run: () => ({
			effect: { name: 'glitch', duration: 2000 },
			output: [{ type: 'text', value: 'Injecting temporary interface distortion...' }]
		})
	},
	{
		name: '-ping',
		description: 'Fake ping test',
		delay: 160,
		run: () => ({
			stream: [
				[{ type: 'heading', value: 'PING XCIPHER NODE' }],
				[{ type: 'text', value: 'Reply from core: time=12ms' }],
				[{ type: 'text', value: 'Reply from core: time=9ms' }],
				[{ type: 'text', value: 'Reply from core: time=14ms' }],
				[{ type: 'text', value: 'Connection stable.' }]
			]
		})
	},
	{
		name: '-time',
		description: 'Show current local time',
		delay: 80,
		run: (_input, context) => ({
			output: [{ type: 'text', value: context.now().toLocaleTimeString() }]
		})
	},
	{
		name: '-date',
		description: 'Show current local date',
		delay: 80,
		run: (_input, context) => ({
			output: [{ type: 'text', value: context.now().toLocaleDateString() }]
		})
	},
	{
		name: '-sudo rm reality',
		description: 'nice try',
		hidden: true,
		run: () => ({ output: [{ type: 'text', value: 'nice try.' }] })
	},
	{
		name: '-sudo',
		description: 'permission denied',
		hidden: true,
		run: () => ({ output: [{ type: 'text', value: 'permission denied.' }] })
	},
	{
		name: '-hack',
		description: 'ACCESS DENIED',
		hidden: true,
		delay: 280,
		run: () => ({
			stream: [
				[{ type: 'text', value: 'ACCESSING SECURE DATABASE...' }],
				[{ type: 'text', value: 'ACCESS DENIED' }]
			]
		})
	}
];

export const publicCommandNames = terminalCommands.filter((command) => !command.hidden).map((command) => command.name);

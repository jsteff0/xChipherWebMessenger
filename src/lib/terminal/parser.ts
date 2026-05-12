export function normalizeCommand(value: string) {
	return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function commandMatches(input: string, name: string, aliases: string[] = []) {
	const normalized = normalizeCommand(input);
	return normalized === name || aliases.some((alias) => normalized === normalizeCommand(alias));
}

export function findCommandSuggestions(input: string, commandNames: string[]) {
	const normalized = normalizeCommand(input);
	if (!normalized) return commandNames.slice(0, 6);

	return commandNames
		.filter((name) => name.startsWith(normalized) || name.includes(normalized))
		.slice(0, 6);
}

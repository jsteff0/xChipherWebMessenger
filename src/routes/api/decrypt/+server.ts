import { json } from '@sveltejs/kit';
import { decrypt } from '$lib/main';

export async function POST({ request }) {
	const { text, key } = await request.json();

	if (!text || !key) {
		return json({ error: 'Missing text or key' }, { status: 400 });
	}

	try {
		const result = decrypt(text, key);
		return json({ result });
	} catch (e) {
		return json({ error: 'Decryption failed' }, { status: 500 });
	}
}

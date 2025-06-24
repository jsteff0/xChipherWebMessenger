import { json } from '@sveltejs/kit';
import { encrypt } from '$lib/main';

export async function POST({ request }) {
	const { text, key } = await request.json();

	if (!text || !key) {
		return json({ error: 'Missing text or key' }, { status: 400 });
	}

	try {
		const result = encrypt(text, key);
		return json({ result });
	} catch (e) {
		return json({ error: 'Encryption failed' }, { status: 500 });
	}
}

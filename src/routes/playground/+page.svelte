<script lang="ts">
	import { decrypt, encrypt } from "$lib/main";

	let encryptKey = "";
	let plaintext = "";
	let encryptResult = "";

	let decryptKey = "";
	let ciphertext = "";
	let decryptResult = "";

	function handleEncrypt() {
		const res = encrypt(plaintext, encryptKey);
		encryptResult = res || "Error has occurred :(";
	}

	function handleDecrypt() {
		const res = decrypt(ciphertext, decryptKey);
		decryptResult = res || "Error has occurred :(";
	}
</script>

<div class="p-4 space-y-8">
	<section>
		<h1 class="font-bold text-[24px]">Encrypt</h1>
		<div class="flex gap-2 items-center my-2 flex-wrap">
			<input
				bind:value={encryptKey}
				maxlength="32"
				class="w-[250px] rounded-[14px] overflow-x-auto whitespace-nowrap"
				type="text"
				placeholder="Key (hex, 32 chars)"
				spellcheck="false"
				autocomplete="off"
			/>
			<input
				bind:value={plaintext}
				class="w-[250px] rounded-[14px] overflow-x-auto whitespace-nowrap"
				type="text"
				placeholder="Plaintext"
				spellcheck="false"
			/>
			<button
				class="px-[18px] py-2 bg-[#297676] rounded-[14px] text-[#f2f2f2]"
				on:click={handleEncrypt}>
				Encrypt
			</button>
		</div>
		<div class="font-medium">
			Result:
			<div class="mt-1 break-all bg-[#dedfda] shadow-[0px_18px_40px_0px_rgba(36,60,74,0.45)] p-3 rounded">{encryptResult}</div>
		</div>
	</section>

	<section>
		<h1 class="font-bold text-[24px]">Decrypt</h1>
		<div class="flex gap-2 items-center my-2 flex-wrap">
			<input
				bind:value={decryptKey}
				maxlength="32"
				class="w-[250px] rounded-[14px] overflow-x-auto whitespace-nowrap"
				type="text"
				placeholder="Key (hex, 32 chars)"
				spellcheck="false"
				autocomplete="off"
			/>
			<input
				bind:value={ciphertext}
				class="w-[250px] rounded-[14px] overflow-x-auto whitespace-nowrap"
				type="text"
				placeholder="Ciphertext"
				spellcheck="false"
			/>
			<button
				class="px-[18px] py-2 bg-[#297676] rounded-[14px] text-[#f2f2f2]"
				on:click={handleDecrypt}>
				Decrypt
			</button>
		</div>
		<div class="font-medium">
			Result:
			<div class="mt-1 break-all bg-[#dedfda] shadow-[0px_18px_40px_0px_rgba(36,60,74,0.45)] p-3 rounded">{decryptResult}</div>
		</div>
	</section>
</div>

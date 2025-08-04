<script lang="ts">
	import { onMount } from "svelte";

	type Msg = { id: number; author: string; text: string };

	let messages: Msg[] = [];

		const preload: Msg[] = [
		{ id: 1, author: "Alice", text: "Welcome to XCipher website" },
		{ id: 2, author: "Bob", text: "Here are some links for this project:" },
		{ id: 3, author: "Alice", text: `<a target="_blank" class="underline" href="https://t.me/XCipherLab">XCipherLab Telegram</a>` },
		{ id: 4, author: "Bob", text: `<a target="_blank" class="underline" href="https://www.instagram.com/xcipherlab/">XCipherLab Instagram</a>` },
		{ id: 5, author: "Alice", text: `<a target="_blank" class="underline" href="https://www.patreon.com/c/XCipherLab">XCipherLab Patreon</a>` },
		{ id: 6, author: "Bob", text: `<a target="_blank" class="underline hover:line" href="https://github.com/jsteff0/xCipher">GitHub of xCipher</a>` },
		{ id: 7, author: "Alice", text: `<a target="_blank" class="underline" href="https://github.com/jsteff0/xChipherWebMessenger">xCipher API</a>` },
		{ id: 8, author: "Bob", text: `<a target="_blank" class="underline" href="/playground/">xCipher Playground</a>` },
		{ id: 9, author: "Alice", text: `<a target="_blank" class="underline" href="/euromath2025/">Euromath page</a>` },
		{ id: 10, author: "Bob", text: `<a target="_blank" class="underline" href="https://drive.google.com/drive/folders/1m_wAx5dk_zKpkRS35Hf41MQ-IAfQoxmx?usp=sharing">Euromath presentation and text script</a>` },
	];

	onMount(() => {
		messages = [preload[0]]; // Start with the first message
		scrollToBottom();
		preload.slice(1).forEach((msg, index) => {
			setTimeout(() => {
				messages = [...messages, msg];
				scrollToBottom();
			}, 1000 + (index > 2 ? index * 500 : index * 700));
		});
	});

	function scrollToBottom() {
		const container = document.getElementById("msgcontainer");
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}
</script>

<div
	class="pt-[15px] w-[390px] h-[530px] bg-[#dedfda] rounded-[36px] overflow-clip shadow-[0px_18px_40px_0px_rgba(36,60,74,0.45)] flex-col justify-start items-center inline-flex"
>
	<div
		id="msgcontainer"
		class="h-full w-full px-[35px] m-[35px] overflow-y-auto"
	>
		{#each messages as msg}
			<div class="flex justify-start items-end gap-2.5 mb-5 msg">
				<img
					src={`/${msg.author.toLocaleLowerCase()}pfp.svg`}
					alt={msg.author}
					class="h-full"
				/>
				<div>
					<div
						class="h-[17px] pl-2.5 justify-start items-center gap-[15px] inline-flex"
					>
						<p
							class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
						>
							{msg.author}
						</p>
					</div>
					<div
						class="px-5 py-2.5 bg-[#297676] rounded-[15px] text-white break-words"
					>
						<p
							class="text-white text-[16px] font-normal font-['Montserrat'] break-words"
						>
							{@html msg.text.replace(/\n/g, "<br>")}
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div
		class="self-stretch px-[34px] py-[19px] bg-[#d2d3cc] justify-between items-center inline-flex"
	>
		<input
			id="messege"
			class="text-[#6e6e6e] bg-transparent border-none text-base font-bold font-['Montserrat']"
			placeholder="Message"
		/>

		<button
			id="sendthemsg"
			class="px-[18px] py-2 bg-[#297676] rounded-[14px] justify-center items-center gap-2.5 flex overflow-hidden"
		>
			<p
				class="text-[#f2f2f2] text-[13px] font-semibold font-['Montserrat']"
			>
				Send
			</p>
		</button>
	</div>
</div>

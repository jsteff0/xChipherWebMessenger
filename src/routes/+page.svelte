<script lang="ts">
	import { onMount } from "svelte";
	import { decript } from "$lib/main";
	onMount(() => {
		setTimeout(() => {
			const msgcontainer = document.getElementById("msgcontainer");
			const msg2 = document.getElementById("msg2");
			if (msg2 && msgcontainer) {
				msg2.style.display = "flex";
				msgcontainer.scrollTop = msgcontainer.scrollHeight;
			}
		}, 1500);
		setTimeout(() => {
			const msgcontainer = document.getElementById("msgcontainer");
			const msg3 = document.getElementById("msg3");
			if (msg3 && msgcontainer) {
				msg3.style.display = "flex";
				msgcontainer.scrollTop = msgcontainer.scrollHeight;
			}
		}, 3000);
	});
</script>

<div
	class="pt-[15px] w-[390px] h-[530px] bg-[#dedfda] rounded-[36px] overflow-clip shadow-[0px_18px_40px_0px_rgba(36,60,74,0.45)] flex-col justify-start items-center inline-flex"
>
	<div
		id="msgcontainer"
		class="h-full w-full px-[35px] m-[35px] overflow-y-auto"
	>
		<div id="msg1" class="flex justify-start items-end gap-2.5 mb-5">
			<img src="/alicepfp.svg" class="h-full" alt="" />
			<div>
				<div
					class="h-[17px] pl-2.5 justify-start items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						Alice
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						class="text-white text-[16px] font-normal font-['Montserrat'] break-words"
					>
						Here is the messege you have to decrypt
					</p>
				</div>
			</div>
		</div>
		<div id="msg2" class=" justify-start items-end gap-2.5 mb-5">
			<img src="/bobpfp.svg" class="h-full" alt="" />
			<div>
				<div
					class="h-[17px] pl-2.5 justify-start items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						Bob
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						id="textmsg2"
						class="text-white text-[16px] font-normal font-['Montserrat'] break-all"
					>
						0b0801b9aded4864df220cfa157415089ea02b3499989956d536555cf1d5455a
					</p>
				</div>
			</div>
		</div>
		<div id="msg3" class="justify-start items-end gap-2.5 mb-5">
			<img src="/alicepfp.svg" class="h-full" alt="" />
			<div>
				<div
					class="h-[17px] pl-2.5 justify-start items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						Alice
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						class="text-white text-[16px] font-normal font-['Montserrat'] break-words"
					>
						Now, send the key, that already typed for you
					</p>
				</div>
			</div>
		</div>
		<div id="msg4" class="flex justify-start items-end gap-2.5 mb-5">
			<div>
				<div
					class="h-[17px] w-full pr-2.5 justify-end items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						You
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						id="textmsg4"
						class="text-white text-[16px] font-normal font-['Montserrat'] break-all"
					></p>
				</div>
			</div>
			<img src="/youpfp.svg" class="h-full" alt="" />
		</div>
		<div id="msg5" class=" justify-start items-end gap-2.5 mb-5">
			<img src="/bobpfp.svg" class="h-full" alt="" />
			<div>
				<div
					class="h-[17px] pl-2.5 justify-start items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						Bob
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						id="textmsg5"
						class="text-white text-[16px] font-normal font-['Montserrat'] break-words"
					></p>
				</div>
			</div>
		</div>
		<div id="msg6" class="justify-start items-end gap-2.5 mb-5">
			<img src="/alicepfp.svg" class="h-full" alt="" />
			<div>
				<div
					class="h-[17px] pl-2.5 justify-start items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						Alice
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						class="text-white text-[16px] font-normal font-['Montserrat'] break-words"
					>
						Now, <button class="underline"
							onclick={() => {
								navigator.clipboard
									.writeText("a1f4c5b3d9e0872fb4c1a2d3e5f60789")
									.then(() => {
										alert("Key copied to clipboard");
									})
									.catch((err) => {
										console.error(
											"Error: ",
											err,
										);
									});
							}}
						>copy</button> the key, and change just a few characters in
						it, to see how it affects the message
					</p>
				</div>
			</div>
		</div>
		<div id="msg7" class="flex justify-start items-end gap-2.5 mb-5">
			<div>
				<div
					class="h-[17px] w-full pr-2.5 justify-end items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						You
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						id="textmsg7"
						class="text-white text-[16px] font-normal font-['Montserrat'] break-all"
					></p>
				</div>
			</div>
			<img src="/youpfp.svg" class="h-full" alt="" />
		</div>
		<div id="msg8" class=" justify-start items-end gap-2.5 mb-5">
			<img src="/bobpfp.svg" class="h-full" alt="" />
			<div>
				<div
					class="h-[17px] pl-2.5 justify-start items-center gap-[15px] inline-flex"
				>
					<p
						class="text-[#297676] text-[15px] font-normal font-['Montserrat']"
					>
						Bob
					</p>
				</div>
				<div
					class="px-5 py-2.5 bg-[#297676] overflow-hidden h-auto rounded-[15px]"
				>
					<p
						id="textmsg8"
						class="text-white text-[16px] font-normal font-['Montserrat'] break-all"
					></p>
				</div>
			</div>
		</div>
	</div>
	<div
		class="self-stretch px-[34px] py-[19px] bg-[#d2d3cc] justify-between items-center inline-flex"
	>
		<input
			id="messege"
			class="text-[#6e6e6e] bg-transparent border-none text-base font-bold font-['Montserrat']"
			value="a1f4c5b3d9e0872fb4c1a2d3e5f60789"
			placeholder="Message"
			onkeydown={async (e) => {
				if (e.key !== "Enter") return;
				const button = document.querySelector("button");
				if (button) button.click();
			}}
		/>

		<button id="sendthemsg"
			class="px-[18px] py-2 bg-[#297676] rounded-[14px] justify-center items-center gap-2.5 flex overflow-hidden"
			onkeydown={async (e) => {
				if (e.key !== "Enter") return;
				const button = document.getElementById("sendthemsg");
				if (button) button.click();
			}}
			onclick={() => {
				const msgcontainer = document.getElementById("msgcontainer");
				const msg = document.getElementById(
					"messege",
				) as HTMLInputElement;
				const textmsg2 = document.getElementById("textmsg2");
				const textmsg4 = document.getElementById("textmsg4");
				const textmsg7 = document.getElementById("textmsg7");
				const msg4 = document.getElementById("msg4");
				const msg7 = document.getElementById("msg7");
				if (
					msg &&
					msgcontainer &&
					textmsg4 &&
					msg4 &&
					msg7 &&
					textmsg7 &&
					textmsg2
				) {
					if (msg.value.length !== 32) {
						alert("The message must be 32 characters long.");
						return;
					}
					if (msg4.style.display != "flex") {
						const key = msg.value;
						msg.value = "";
						textmsg4.innerText = key;
						msg4.style.display = "flex";
						msgcontainer.scrollTop = msgcontainer.scrollHeight;
						setTimeout(() => {
							const msg5 = document.getElementById("msg5");
							const textmsg5 =
								document.getElementById("textmsg5");
							if (msg5 && textmsg5) {
								textmsg5.innerText =
									"Your message is: " +
									decript(textmsg2.innerText, key);
								msg5.style.display = "flex";
								msgcontainer.scrollTop =
									msgcontainer.scrollHeight;
							}
						}, 1500);
						setTimeout(() => {
							const msg6 = document.getElementById("msg6");
							if (msg6) {
								msg6.style.display = "flex";
								msgcontainer.scrollTop =
									msgcontainer.scrollHeight;
							}
						}, 4000);
					} else {
						const key = msg.value;
						msg.value = "";
						textmsg7.innerText = key;
						msg7.style.display = "flex";
						msgcontainer.scrollTop = msgcontainer.scrollHeight;
						setTimeout(() => {
							const msg8 = document.getElementById("msg8");
							const textmsg8 =
								document.getElementById("textmsg8");
							if (msg8 && textmsg8) {
								textmsg8.innerText =
									"Your message is: " +
									decript(textmsg2.innerText, key);
								msg8.style.display = "flex";
								msgcontainer.scrollTop =
									msgcontainer.scrollHeight;
							}
						}, 1500);
					}
				}
			}}
		>
			<p
				class="text-[#f2f2f2] text-[13px] font-semibold font-['Montserrat']"
			>
				Send
			</p>
		</button>
	</div>
</div>
<div class="flex items-center justify-center opacity-40">
	<img src="/info.svg" class="w-4" alt="" />
	<p>Key: a1f4c5b3d9e0872fb4c1a2d3e5f60789</p>
</div>

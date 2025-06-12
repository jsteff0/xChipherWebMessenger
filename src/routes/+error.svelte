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
						I think you are on the wrong page
					</p>
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
			placeholder="Message"
		/>

		<button

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


<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	#msg1 {
		animation: fadeIn 1s ease-out;
	}

</style>
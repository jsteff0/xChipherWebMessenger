<script lang="ts">
	import { encript } from "$lib/main";
</script>
<div>
<input type="text" id="key" placeholder="key">
<input type="text" id="text" placeholder="text">
<button onclick={() => {
	const textInput = document.getElementById("text") as HTMLInputElement;
	const keyInput = document.getElementById("key") as HTMLInputElement;
	const resultDiv = document.getElementById("result") as HTMLDivElement;
	if(textInput && keyInput && resultDiv) {
		const encriptedText = encript(textInput.value, keyInput.value);
		if(encriptedText)
			resultDiv.innerText = encriptedText;
		else 
			resultDiv.innerText = "Error :("
	}
	
	}
}>Encript</button>
<div id="result"></div>
</div>
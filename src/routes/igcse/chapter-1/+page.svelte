<script>
	const buttons = document.querySelectorAll(".tab-btn");
	const panels = document.querySelectorAll(".tab-panel");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const target = button.dataset.tab;

			buttons.forEach((b) => b.classList.remove("active"));
			panels.forEach((p) => p.classList.remove("active"));

			button.classList.add("active");
			document.getElementById(target).classList.add("active");
		});
	});

	const flashcardsMount = document.getElementById("flashcardsMount");
	const flashcardsProgressText = document.getElementById(
		"flashcardsProgressText",
	);
	const flashcardsProgressFill = document.getElementById(
		"flashcardsProgressFill",
	);
	const flashcardsPrevBtn = document.getElementById("flashcardsPrevBtn");
	const flashcardsNextBtn = document.getElementById("flashcardsNextBtn");
	const flashcardsFlipBtn = document.getElementById("flashcardsFlipBtn");
	const flashcardsShuffleBtn = document.getElementById(
		"flashcardsShuffleBtn",
	);

	let flashcards = [];
	let currentFlashcardIndex = 0;
	let flashcardFlipped = false;

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function escapeHtml(value) {
		return String(value)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	function renderFlashcardsEmpty(message) {
		flashcardsMount.innerHTML = `<div class="flashcards-empty">${message}</div>`;
		flashcardsProgressText.textContent = "No flashcards loaded";
		flashcardsProgressFill.style.width = "0%";
		flashcardsPrevBtn.disabled = true;
		flashcardsNextBtn.disabled = true;
		flashcardsFlipBtn.disabled = true;
		flashcardsShuffleBtn.disabled = true;
	}

	function updateFlashcardsProgress() {
		if (!flashcards.length) return;
		const card = flashcards[currentFlashcardIndex];
		const section = card.subchapter ? ` • ${card.subchapter}` : "";
		flashcardsProgressText.textContent = `Card ${currentFlashcardIndex + 1} of ${flashcards.length}${section}`;
		flashcardsProgressFill.style.width = `${((currentFlashcardIndex + 1) / flashcards.length) * 100}%`;
		flashcardsPrevBtn.disabled = currentFlashcardIndex === 0;
		flashcardsNextBtn.disabled =
			currentFlashcardIndex === flashcards.length - 1;
		flashcardsFlipBtn.disabled = false;
		flashcardsShuffleBtn.disabled = flashcards.length < 2;
	}

	function renderFlashcard() {
		if (!flashcards.length) {
			renderFlashcardsEmpty(
				'No Chapter 1 flashcards found in <span class="mono">flashcards.json</span>.',
			);
			return;
		}

		const card = flashcards[currentFlashcardIndex];
		const category = escapeHtml(card.category || "Chapter 1");
		const subchapter = escapeHtml(card.subchapter || "Flashcard");
		const question = escapeHtml(card.question || "");
		const answer = escapeHtml(card.answer || "").replace(/\n/g, "<br>");

		flashcardsMount.innerHTML = `
        <div class="flashcard ${flashcardFlipped ? "flipped" : ""}">
          <div class="flashcard-inner">
            <article class="flashcard-face flashcard-front">
              <div>
                <span class="flashcard-label">Question</span>
                <div class="flashcard-meta">${category} • ${subchapter}</div>
                <h3 class="flashcard-title">${question}</h3>
              </div>
              <div class="flashcard-meta">Click “Flip Card” to reveal the answer.</div>
            </article>

            <article class="flashcard-face flashcard-back">
              <div>
                <span class="flashcard-label">Answer</span>
                <div class="flashcard-meta">${category} • ${subchapter}</div>
                <p class="flashcard-answer">${answer}</p>
              </div>
              <div class="flashcard-meta">Use Previous / Next to move through the deck.</div>
            </article>
          </div>
        </div>
      `;

		updateFlashcardsProgress();
	}

	async function loadFlashcards() {
		try {
			const response = await fetch("./flashcards.json");
			if (!response.ok) {
				throw new Error("Could not load flashcards.json");
			}

			const data = await response.json();
			const allFlashcards = Array.isArray(data.chapter1)
				? data.chapter1
				: [];
			flashcards = [...allFlashcards];

			if (!flashcards.length) {
				renderFlashcardsEmpty(
					'The JSON file loaded, but it does not contain any <span class="mono">chapter1</span> flashcards.',
				);
				return;
			}

			currentFlashcardIndex = 0;
			flashcardFlipped = false;
			renderFlashcard();
		} catch (error) {
			renderFlashcardsEmpty(
				`Failed to load flashcards. Make sure <span class="mono">flashcards.json</span> exists in the same folder and contains a <span class="mono">chapter1</span> array.<br><br>${escapeHtml(error.message)}`,
			);
		}
	}

	flashcardsPrevBtn.addEventListener("click", () => {
		if (currentFlashcardIndex > 0) {
			currentFlashcardIndex -= 1;
			flashcardFlipped = false;
			renderFlashcard();
		}
	});

	flashcardsNextBtn.addEventListener("click", () => {
		if (currentFlashcardIndex < flashcards.length - 1) {
			currentFlashcardIndex += 1;
			flashcardFlipped = false;
			renderFlashcard();
		}
	});

	flashcardsFlipBtn.addEventListener("click", () => {
		if (!flashcards.length) return;
		flashcardFlipped = !flashcardFlipped;
		renderFlashcard();
	});

	flashcardsShuffleBtn.addEventListener("click", () => {
		if (flashcards.length < 2) return;
		shuffleArray(flashcards);
		currentFlashcardIndex = 0;
		flashcardFlipped = false;
		renderFlashcard();
	});

	loadFlashcards();
</script>

<div class="wrap">
	<section class="hero">
		<h1>Chapter 1 Revision Notes</h1>
		<p>
			This chapter covers the core ideas of data representation, including
			number systems, text, sound, images, storage size and compression —
			the essentials you need to understand how data is stored and
			processed by a computer.
		</p>
		<div class="hero-actions">
			<a class="back-btn" href="index.html">← Back to Main Page</a>
		</div>
	</section>

	<div class="layout">
		<aside class="sidebar">
			<h2>Subchapters</h2>
			<button class="tab-btn active" data-tab="tab-1"
				>1.1 Number Systems</button
			>
			<button class="tab-btn" data-tab="tab-2"
				>1.2 Text, Sound and Images</button
			>
			<button class="tab-btn" data-tab="tab-3"
				>1.3 Data Storage and Compression</button
			>
			<button class="tab-btn" data-tab="tab-4">Flashcards</button>
			<button class="tab-btn" data-tab="tab-5">Quick Memorise List</button
			>
		</aside>

		<main class="content">
			<section id="tab-1" class="tab-panel active">
				<h2>1.1 Number Systems</h2>
				<span class="pill">Binary</span><span class="pill"
					>Hexadecimal</span
				><span class="pill">Overflow</span><span class="pill"
					>Two’s complement</span
				>

				<h3>Why computers use binary</h3>
				<p>
					Computers represent all data in binary because electronic
					components act like switches with only two states: <b>on</b>
					and <b>off</b>. These are represented by <b>1</b> and
					<b>0</b>, so any data must be converted into binary before
					it can be processed.
				</p>

				<h3>Denary, binary and hexadecimal</h3>
				<ul>
					<li><b>Denary</b>: base 10, uses digits 0–9</li>
					<li><b>Binary</b>: base 2, uses digits 0 and 1</li>
					<li>
						<b>Hexadecimal</b>: base 16, uses digits 0–9 and letters
						A–F
					</li>
					<li>
						In hexadecimal: <span class="mono"
							>A=10, B=11, C=12, D=13, E=14, F=15</span
						>
					</li>
				</ul>

				<h3>8-bit binary place values</h3>
				<div class="big-mono">128 64 32 16 8 4 2 1</div>

				<h3>4-bit binary to hexadecimal table</h3>
				<div class="grid-2">
					<table>
						<tbody>
							<tr><td>Binary</td><td>Hex</td></tr>
							<tr><td>0000</td><td>0</td></tr>
							<tr><td>0001</td><td>1</td></tr>
							<tr><td>0010</td><td>2</td></tr>
							<tr><td>0011</td><td>3</td></tr>
							<tr><td>0100</td><td>4</td></tr>
							<tr><td>0101</td><td>5</td></tr>
							<tr><td>0110</td><td>6</td></tr>
							<tr><td>0111</td><td>7</td></tr>
						</tbody>
					</table>

					<table>
						<tbody>
							<tr><th>Binary</th><th>Hex</th></tr>
							<tr><td>1000</td><td>8</td></tr>
							<tr><td>1001</td><td>9</td></tr>
							<tr><td>1010</td><td>A</td></tr>
							<tr><td>1011</td><td>B</td></tr>
							<tr><td>1100</td><td>C</td></tr>
							<tr><td>1101</td><td>D</td></tr>
							<tr><td>1110</td><td>E</td></tr>
							<tr><td>1111</td><td>F</td></tr>
						</tbody>
					</table>
				</div>

				<h3>Binary to denary</h3>
				<p>Add the place values where there is a 1.</p>
				<div class="card">
					<b>Example:</b><br />
					<span class="mono"
						>11101110 = 128 + 64 + 32 + 8 + 4 + 2 = 238</span
					>
				</div>

				<h3>Denary to binary</h3>
				<p>Two main methods:</p>
				<ul>
					<li>subtracting powers of 2</li>
					<li>
						repeated division by 2, then reading remainders upwards
					</li>
				</ul>

				<h3>Binary to hexadecimal</h3>
				<p>
					Split the binary number into groups of 4 bits from the
					right, then convert each group.
				</p>
				<div class="card">
					<b>Example:</b> <span class="mono">101111100001 = BE1</span>
				</div>

				<h3>Hexadecimal to binary</h3>
				<p>Replace each hex digit with its 4-bit binary equivalent.</p>
				<div class="card">
					<b>Example:</b>
					<span class="mono">45A = 0100 0101 1010</span>
				</div>

				<h3>Hexadecimal to denary</h3>
				<p>Multiply each hex digit by its place value.</p>
				<div class="card">
					<b>Example:</b>
					<span class="mono"
						>45A = (4 × 256) + (5 × 16) + (10 × 1) = 1114</span
					>
				</div>

				<h3>Denary to hexadecimal</h3>
				<p>
					Use repeated division by 16 and read remainders from bottom
					to top.
				</p>
				<div class="card">
					<b>Example:</b> <span class="mono">2004 = 7D4</span>
				</div>

				<h3>Why hexadecimal is useful</h3>
				<p>
					Hexadecimal is easier for humans to read, remember and write
					than long binary strings because <b
						>1 hex digit = 4 binary bits</b
					>.
				</p>

				<h3>Uses of hexadecimal</h3>
				<ul>
					<li>error codes</li>
					<li>MAC addresses</li>
					<li>IPv6 addresses</li>
					<li>HTML colour codes</li>
				</ul>

				<h3>MAC address</h3>
				<p>
					A <b>MAC address</b> uniquely identifies a device on a
					network and is linked to the
					<b>network interface card (NIC)</b>.
				</p>
				<ul>
					<li>usually <b>48 bits</b></li>
					<li>written as <b>6 groups of 2 hexadecimal digits</b></li>
					<li>
						example: <span class="mono">00-1C-B3-4F-25-FE</span>
					</li>
					<li>first half identifies the manufacturer</li>
					<li>second half is the serial number</li>
				</ul>

				<h3>IPv4 and IPv6</h3>
				<ul>
					<li><b>IPv4</b> is <b>32 bits</b></li>
					<li>
						<b>IPv6</b> is <b>128 bits</b>, written in hexadecimal
						in groups separated by colons
					</li>
				</ul>
				<div class="card">
					<b>Example IPv6:</b>
					<span class="mono"
						>a8fb:7a88:fff0:0fff:3d21:2085:66fb:f0fa</span
					>
				</div>

				<h3>HTML colour codes</h3>
				<p>
					HTML colours use hexadecimal in the form <span class="mono"
						>#RRGGBB</span
					>, where RR = red, GG = green, BB = blue.
				</p>
				<ul>
					<li><span class="mono">#FF0000</span> = red</li>
					<li><span class="mono">#00FF00</span> = green</li>
					<li><span class="mono">#0000FF</span> = blue</li>
				</ul>

				<h3>Binary addition</h3>
				<ul>
					<li><span class="mono">0 + 0 = 0</span></li>
					<li><span class="mono">0 + 1 = 1</span></li>
					<li><span class="mono">1 + 0 = 1</span></li>
					<li>
						<span class="mono">1 + 1 = 10</span>, so write 0 and
						carry 1
					</li>
					<li>
						For three bits: <span class="mono">1 + 1 + 1 = 11</span
						>, so write 1 and carry 1
					</li>
				</ul>

				<h3>Overflow</h3>
				<p>
					<b>Overflow</b> happens when the answer is too large to fit in
					the available number of bits.
				</p>
				<ul>
					<li>
						in an <b>8-bit register</b>, the maximum value is
						<b>255</b>
					</li>
					<li>if the result is greater than 255, overflow occurs</li>
					<li>
						a <b>9th bit</b> in 8-bit addition is a clear sign of overflow
					</li>
				</ul>

				<h3>Logical binary shifts</h3>
				<p>A <b>logical shift</b> moves all bits left or right.</p>
				<ul>
					<li><b>Shift left</b> multiplies by 2 for each shift</li>
					<li><b>Shift right</b> divides by 2 for each shift</li>
					<li>bits shifted out are lost</li>
					<li>empty positions are filled with 0</li>
					<li>
						too many shifts can give the wrong answer because
						important bits are lost
					</li>
				</ul>

				<h3>MSB and LSB</h3>
				<ul>
					<li><b>MSB</b> = most significant bit = leftmost bit</li>
					<li><b>LSB</b> = least significant bit = rightmost bit</li>
				</ul>

				<h3>Two’s complement</h3>
				<p>
					Two’s complement is used to represent <b
						>positive and negative 8-bit integers</b
					>.
				</p>

				<h3>Place values in 8-bit two’s complement</h3>
				<div class="big-mono">-128 64 32 16 8 4 2 1</div>

				<h3>Range</h3>
				<ul>
					<li>
						minimum = <span class="mono">10000000</span> =
						<b>-128</b>
					</li>
					<li>
						maximum = <span class="mono">01111111</span> =
						<b>+127</b>
					</li>
				</ul>

				<h3>Sign rule</h3>
				<ul>
					<li>
						if the leftmost bit is <b>0</b>, the number is positive
					</li>
					<li>
						if the leftmost bit is <b>1</b>, the number is negative
					</li>
				</ul>

				<h3>Positive two’s complement</h3>
				<p>
					Positive numbers are written like normal binary, with a 0 in
					the leftmost bit.
				</p>

				<h3>Negative two’s complement</h3>
				<p>Method:</p>
				<ol>
					<li>write the positive binary value</li>
					<li>invert all bits</li>
					<li>add 1</li>
				</ol>
				<div class="card">
					<b>Example:</b><br />
					+67 = <span class="mono">01000011</span><br />
					invert = <span class="mono">10111100</span><br />
					add 1 = <span class="mono">10111101</span><br />
					so -67 = <span class="mono">10111101</span>
				</div>
			</section>

			<section id="tab-2" class="tab-panel">
				<h2>1.2 Text, Sound and Images</h2>
				<span class="pill">ASCII</span><span class="pill">Unicode</span
				><span class="pill">Sampling</span><span class="pill"
					>Pixels</span
				>

				<h3>Text representation</h3>
				<p>
					Text is converted into binary so it can be processed by a
					computer. Computers use <b>character sets</b> to represent characters.
				</p>

				<h3>ASCII</h3>
				<p>
					ASCII stands for <b
						>American Standard Code for Information Interchange</b
					>.
				</p>
				<ul>
					<li>standard ASCII uses <b>7 bits</b></li>
					<li>codes go from 0 to 127</li>
					<li>
						used for letters, digits, symbols and control characters
					</li>
				</ul>

				<h3>Unicode</h3>
				<p>
					Unicode can represent a much wider range of characters than
					ASCII.
				</p>
				<ul>
					<li>supports many languages and symbols</li>
					<li>includes emojis</li>
					<li>uses more bits per character than ASCII</li>
				</ul>

				<h3>Sound representation</h3>
				<p>A sound wave is <b>sampled</b> and converted to binary.</p>
				<table>
					<tbody>
						<tr><th>Term</th><th>Meaning</th></tr>
						<tr
							><td>Sample rate</td><td
								>Number of samples taken each second</td
							></tr
						>
						<tr
							><td>Sample resolution</td><td
								>Number of bits per sample</td
							></tr
						>
					</tbody>
				</table>
				<ul>
					<li>Higher sample rate improves quality</li>
					<li>Higher sample resolution improves quality</li>
					<li>Higher values also increase file size</li>
				</ul>

				<h3>Image representation</h3>
				<p>
					An image is made of <b>pixels</b>, which are converted to
					binary.
				</p>
				<table>
					<tbody>
						<tr><th>Term</th><th>Meaning</th></tr>
						<tr
							><td>Resolution</td><td
								>Number of pixels in the image</td
							></tr
						>
						<tr
							><td>Colour depth</td><td
								>Number of bits used for each colour</td
							></tr
						>
					</tbody>
				</table>
				<ul>
					<li>Higher resolution improves quality</li>
					<li>Higher colour depth improves quality</li>
					<li>Both also increase file size</li>
				</ul>
			</section>

			<section id="tab-3" class="tab-panel">
				<h2>1.3 Data Storage and Compression</h2>
				<span class="pill">Storage units</span><span class="pill"
					>File size</span
				><span class="pill">Lossless</span><span class="pill"
					>Lossy</span
				>

				<h3>Storage units</h3>
				<ul>
					<li>bit</li>
					<li>nibble</li>
					<li>byte</li>
					<li>KiB</li>
					<li>MiB</li>
					<li>GiB</li>
					<li>TiB</li>
					<li>PiB</li>
					<li>EiB</li>
				</ul>

				<h3>Important facts</h3>
				<ul>
					<li><b>1 nibble = 4 bits</b></li>
					<li><b>1 byte = 8 bits</b></li>
					<li>
						Each larger unit is <b>1024</b> of the previous one, not
						1000
					</li>
				</ul>

				<h3>File size calculations</h3>
				<p>
					You may be asked to calculate image or sound file size using
					given values.
				</p>

				<div class="grid-2">
					<div class="card">
						<h3 style="margin-top:0">Image file size</h3>
						<p>Usually based on:</p>
						<ul>
							<li>resolution</li>
							<li>colour depth</li>
						</ul>
						<p>
							<span class="mono"
								>file size = number of pixels × colour depth</span
							>
						</p>
					</div>

					<div class="card">
						<h3 style="margin-top:0">Sound file size</h3>
						<p>Usually based on:</p>
						<ul>
							<li>sample rate</li>
							<li>sample resolution</li>
							<li>track length</li>
						</ul>
						<p>
							<span class="mono"
								>file size = sample rate × sample resolution ×
								time</span
							>
						</p>
					</div>
				</div>

				<h3>Compression</h3>
				<p>Compression reduces file size.</p>
				<ul>
					<li>less storage space needed</li>
					<li>less bandwidth needed</li>
					<li>shorter transmission time</li>
				</ul>

				<h3>Lossless compression</h3>
				<p>
					Lossless compression reduces file size <b
						>without permanently losing data</b
					>.
				</p>
				<div class="card">
					<b>Example:</b>
					<span class="mono">run length encoding (RLE)</span>
				</div>

				<h3>Lossy compression</h3>
				<p>
					Lossy compression reduces file size by <b
						>permanently removing data</b
					>.
				</p>
				<ul>
					<li>reducing image resolution</li>
					<li>reducing colour depth</li>
					<li>reducing sample rate</li>
					<li>reducing sample resolution</li>
				</ul>
			</section>

			<section id="tab-4" class="tab-panel">
				<h2>Flashcards</h2>
				<span class="pill">Question / Answer</span><span class="pill"
					>Loaded from JSON</span
				><span class="pill">Chapter 1 only</span>

				<div class="flashcards-panel-shell">
					<div class="flashcards-toolbar">
						<div class="flashcards-progress-wrap">
							<div
								class="flashcards-progress-text"
								id="flashcardsProgressText"
							>
								Loading flashcards...
							</div>
							<div class="flashcards-progress-bar">
								<div
									class="flashcards-progress-fill"
									id="flashcardsProgressFill"
								></div>
							</div>
						</div>

						<div class="flashcards-actions">
							<button
								class="flashcards-btn"
								id="flashcardsPrevBtn"
								type="button">← Previous</button
							>
							<button
								class="flashcards-btn"
								id="flashcardsFlipBtn"
								type="button">Flip Card</button
							>
							<button
								class="flashcards-btn"
								id="flashcardsShuffleBtn"
								type="button">Shuffle</button
							>
							<button
								class="flashcards-btn"
								id="flashcardsNextBtn"
								type="button">Next →</button
							>
						</div>
					</div>

					<div id="flashcardsMount">
						<div class="flashcards-empty">
							Loading questions from <span class="mono"
								>flashcards.json</span
							>...
						</div>
					</div>
				</div>
			</section>
			<section id="tab-5" class="tab-panel">
				<h2>Quick Memorise List</h2>
				<span class="pill">Fast recap</span><span class="pill"
					>Before exam</span
				>

				<h3>Numbers and ranges</h3>
				<ul>
					<li>Binary = base 2</li>
					<li>Denary = base 10</li>
					<li>Hex = base 16</li>
					<li>1 nibble = 4 bits</li>
					<li>1 byte = 8 bits</li>
					<li>8-bit max unsigned value = 255</li>
					<li>8-bit two’s complement range = -128 to +127</li>
				</ul>

				<h3>Must-know formulas / rules</h3>
				<ul>
					<li>Binary to denary: add place values</li>
					<li>Binary to hex: split into groups of 4</li>
					<li>Shift left = ×2</li>
					<li>Shift right = ÷2</li>
					<li>Image file size = pixels × colour depth</li>
					<li>
						Sound file size = sample rate × sample resolution × time
					</li>
				</ul>

				<h3>Must-know terms</h3>
				<div class="card">
					ASCII, Unicode, sample rate, sample resolution, resolution,
					colour depth, overflow, logical shift, two’s complement,
					packet, payload, trailer, packet switching, serial,
					parallel, simplex, half-duplex, full-duplex
				</div>

				<h3>Focus for this page</h3>
				<p>
					This HTML page intentionally includes only <b>Chapter 1</b> content
					and leaves out Chapter 2.1.
				</p>
			</section>
		</main>
	</div>
</div>

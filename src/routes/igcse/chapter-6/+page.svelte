<script lang="ts">
	import Flashcards from '../../../components/Flashcards.svelte';

	const tabs = [
		{ id: 'tab-1', label: '6.1 Automated Systems' },
		{ id: 'tab-2', label: '6.2 Robotics' },
		{ id: 'tab-3', label: '6.3 Artificial Intelligence' },
		{ id: 'tab-4', label: 'Flashcards' },
		{ id: 'tab-5', label: 'Quick Memorise List' }
	] as const;

	let activeTab: (typeof tabs)[number]['id'] = 'tab-1';
</script>

<div class="min-h-screen bg-[linear-gradient(180deg,#0a1022_0%,#0d1430_100%)] font-[Inter,Arial,sans-serif] text-cs-text">
	<div class="mx-auto max-w-[1200px] p-6">
		<section class="mb-5 rounded-[24px] border border-cs-border bg-[linear-gradient(135deg,rgba(124,156,255,0.18),rgba(156,194,255,0.08))] p-7 shadow-cs">
			<h1 class="mb-2 text-[34px] leading-[1.1] font-semibold">Chapter 6 Revision Notes</h1>
			<p class="max-w-[900px] text-base leading-[1.6] text-cs-muted">
				This chapter explores modern intelligent and automated technologies, including automated systems,
				robotics and artificial intelligence, and how they are used in real-world situations.
			</p>
			<div class="mt-4 flex flex-wrap gap-2.5">
				<a
					href="/igcse"
					class="inline-flex items-center gap-2 rounded-xl border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.12)] px-[14px] py-[10px] text-sm font-semibold text-white transition duration-200 hover:border-[rgba(124,156,255,0.5)] hover:bg-[rgba(124,156,255,0.2)]"
				>
					← Back to Main Page
				</a>
			</div>
		</section>

		<div class="grid grid-cols-1 gap-5 lg:grid-cols-[290px_1fr]">
			<aside class="h-fit rounded-[22px] border border-cs-border bg-[rgba(18,25,50,0.9)] p-[14px] shadow-cs lg:sticky lg:top-5">
				<h2 class="mx-2 mt-[6px] mb-3 text-sm tracking-[0.08em] uppercase text-cs-accent-2">
					Subchapters
				</h2>
				{#each tabs as tab}
					<button
						type="button"
						on:click={() => (activeTab = tab.id)}
						class={`mb-2 block w-full rounded-[14px] border px-[14px] py-3 text-left text-sm leading-[1.4] transition duration-200 ${
							activeTab === tab.id
								? 'border-[rgba(124,156,255,0.5)] bg-[linear-gradient(135deg,rgba(124,156,255,0.24),rgba(124,156,255,0.12))] font-semibold text-white'
								: 'border-transparent bg-transparent text-cs-text hover:border-[rgba(124,156,255,0.25)] hover:bg-[rgba(124,156,255,0.1)]'
						}`}
					>
						{tab.label}
					</button>
				{/each}
			</aside>

			<main class="rounded-[22px] border border-cs-border bg-[rgba(18,25,50,0.84)] p-6 shadow-cs lg:min-h-[700px]">
				{#if activeTab === 'tab-1'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">6.1 Automated Systems</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Sensors</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Microprocessor</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Actuators</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Advantages / Disadvantages</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">What an automated system is</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An <b>automated system</b> is a combination of hardware and software designed to work automatically with little or no human intervention. Most automated systems still allow human monitoring or manual override.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Main components and how they work together</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Component</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Role</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Sensors</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Measure conditions in the environment and send readings to a computer or microprocessor</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Microprocessor / computer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Processes the sensor data and decides what action to take based on the program</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Actuators</td><td class="px-3 py-2.5 text-sm text-cs-ok">Carry out physical actions such as opening valves, moving wheels, turning pumps or applying brakes</td></tr>
						</tbody></table>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Important link:</b> if sensor data is analogue, it must first be converted to digital using an ADC before the microprocessor can process it.</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Generic process</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Sensors collect data from the surroundings.</li>
							<li>The microprocessor receives and processes the data.</li>
							<li>The program compares the data with stored values or rules.</li>
							<li>If action is needed, signals are sent to actuators.</li>
							<li>The actuators change the physical system automatically.</li>
						</ol>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Scenarios you must know from the syllabus</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>industry</li>
							<li>transport</li>
							<li>agriculture</li>
							<li>weather</li>
							<li>gaming</li>
							<li>lighting</li>
							<li>science</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Industry</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Automated systems are used to monitor and control dangerous or repetitive industrial processes such as nuclear power stations and pharmaceutical production.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Sensors monitor pressure, temperature, radiation, gas levels, flow levels or production values.</li>
							<li>A central computer compares readings with safe operating limits.</li>
							<li>Actuators operate valves, pumps, shut-down systems, heaters, stirrers or pistons.</li>
						</ul>
						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Advantages</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>faster response than humans</li>
									<li>safer in dangerous environments</li>
									<li>more consistent results</li>
									<li>can keep process at optimum conditions</li>
									<li>reduced labour costs in the long run</li>
									<li>higher productivity</li>
								</ul>
							</div>
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Disadvantages</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>expensive to set up</li>
									<li>needs a lot of testing</li>
									<li>still needs maintenance</li>
									<li>possible cyber security risks</li>
									<li>unforeseen conditions may still cause failures</li>
								</ul>
							</div>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Transport</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Automated transport systems include self-parking cars, adaptive cruise control and automatic train safety systems.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Sensors and cameras detect distances, road conditions and obstacles.</li>
							<li>The on-board computer calculates safe action.</li>
							<li>Actuators control steering, brakes, throttle and gears.</li>
						</ul>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Examples to remember:</b> self-parking cars and adaptive cruise control.</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Agriculture</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Automated irrigation systems use weather data and water level sensors to decide when to start or stop water pumps.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Weather stations send data to a controller.</li>
							<li>Water level sensors monitor irrigation channels.</li>
							<li>The controller decides how much water to supply.</li>
							<li>Actuators start or stop pumps.</li>
						</ul>
						<p class="text-[15px] leading-[1.7] text-cs-ok">This improves efficiency and saves resources such as water.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Weather stations</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Automated weather stations collect data using sensors and store or transmit it automatically.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Sensor</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Measures</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Thermometer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Temperature</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Anemometer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Wind speed</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Hygrometer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Humidity</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Barometer</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Air pressure</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Level sensor</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Rainfall</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Light sensor</td><td class="px-3 py-2.5 text-sm text-cs-ok">Hours of daylight / brightness</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Gaming</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Gaming devices use sensors to create a more immersive experience.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Accelerometers</b> detect acceleration, deceleration and tilting.</li>
							<li><b>Proximity sensors</b> detect hand/finger position on touch pads.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Lighting</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Automated lighting systems can turn lights on and off based on darkness or movement.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Light sensors detect the level of ambient light.</li>
							<li>Infra-red or motion sensors detect presence.</li>
							<li>The controller activates security lights or LED displays through actuators/interface circuits.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Science</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Automated laboratory systems use sensors, microprocessors and actuators to control experiments accurately and repeatedly.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Level detectors measure how much liquid is added.</li>
							<li>A colorimeter checks the reaction colour.</li>
							<li>The microprocessor controls valves or taps via actuators.</li>
							<li>Experiments become faster, safer and more repeatable.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Generic advantages of automated systems</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>faster than humans</li>
							<li>more consistent results</li>
							<li>can operate continuously</li>
							<li>can work in dangerous environments</li>
							<li>can keep systems near optimum conditions</li>
							<li>reduced labour requirements</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Generic disadvantages of automated systems</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>high set-up cost</li>
							<li>need maintenance and specialist repair</li>
							<li>possible software failure</li>
							<li>cyber security risks</li>
							<li>less flexible than humans in unusual situations</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-2'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">6.2 Robotics</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Definition</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Characteristics</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Roles</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Pros / Cons</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">What robotics is</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Robotics</b> is a branch of computer science that combines the design, construction and operation of robots.</p>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Examples include factory robots, domestic robots and drones.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Characteristics of a robot</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Characteristic</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">What it means</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Mechanical structure or framework</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">The robot has physical parts such as wheels, arms, cogs, gears or pistons</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Electrical components</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Uses sensors, microprocessors and actuators</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Programmable</td><td class="px-3 py-2.5 text-sm text-cs-ok">Can be controlled by stored instructions or a controller</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Three key robot abilities</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Sense surroundings</b> – using sensors such as light, pressure, temperature, acoustic and cameras</li>
							<li><b>Move</b> – using wheels, gears, pistons, motors, hydraulics and actuators</li>
							<li><b>Be programmable</b> – controlled by software and a controller</li>
						</ol>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Independent vs dependent robots</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Main idea</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Independent robot</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Works autonomously with no direct human control</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Dependent robot</td><td class="px-3 py-2.5 text-sm text-cs-ok">Needs human interaction and supplements human activity</td></tr>
						</tbody></table>

						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Important:</b> robotics and artificial intelligence are not the same. Many robots do repetitive tasks and do not use real AI. Also, software bots such as web crawlers or chat bots are not physical robots.</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Where robots are used</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>industry</li>
							<li>transport</li>
							<li>agriculture</li>
							<li>medicine</li>
							<li>domestic / home</li>
							<li>entertainment</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Industry</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>welding</li>
							<li>spray-painting</li>
							<li>fitting windscreens</li>
							<li>cutting metal parts</li>
							<li>bottling and labelling plants</li>
							<li>automatic warehouses</li>
						</ul>
						<div class="grid grid-cols-1 gap-[14px] md:grid-cols-2">
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Advantages</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>can work in hazardous conditions</li>
									<li>can work 24/7</li>
									<li>higher productivity</li>
									<li>more consistent than humans</li>
									<li>good at repetitive tasks</li>
									<li>lower long-term labour costs</li>
								</ul>
							</div>
							<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4">
								<h3 class="mt-0 mb-[10px] text-lg text-cs-accent-2">Disadvantages</h3>
								<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
									<li>expensive to buy and install</li>
									<li>can lead to unemployment</li>
									<li>can cause deskilling</li>
									<li>not as good at non-standard tasks</li>
								</ul>
							</div>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Transport</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Examples include autonomous cars, autonomous trains and pilotless airplanes.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>Use sensors, cameras, radar, ultrasonic systems, LiDaR and GPS.</li>
							<li>Microprocessors process the data.</li>
							<li>Actuators control steering, braking, throttle, flaps, rudder and doors.</li>
						</ul>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok"><b class="text-cs-text">Main advantages:</b> improved safety, reduced human error, better traffic flow, more efficient transport.<br /><b class="text-cs-text">Main disadvantages:</b> hacking risks, software glitches, high cost, maintenance, public reluctance.</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Agriculture</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">Robots are used for:</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>harvesting and picking fruit/vegetables</li>
							<li>weed control</li>
							<li>phenotyping plant growth and health</li>
							<li>seed planting and fertiliser distribution</li>
							<li>autonomous devices such as grass cutters and harvesters</li>
						</ul>
						<p class="text-[15px] leading-[1.7] text-cs-ok">These improve speed, efficiency and reduce labour requirements.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Medicine</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>surgical procedures</li>
							<li>patient monitoring</li>
							<li>taking blood samples</li>
							<li>room / theatre disinfection</li>
							<li>microbots for target therapy</li>
							<li>prosthetic limbs with sensors and actuators</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Domestic robots</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>autonomous vacuum cleaners</li>
							<li>autonomous lawn mowers</li>
							<li>window and pool cleaning robots</li>
							<li>personal assistants such as Vector-like devices</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Entertainment robots</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>theme park robots</li>
							<li>camera control in film and TV</li>
							<li>robotic special effects</li>
							<li>music festival lighting and animation control</li>
							<li>stunt or humanoid robots in productions</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-3'}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">6.3 Artificial Intelligence</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Definition</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Characteristics</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Expert systems</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Machine learning</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">What AI is</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Artificial intelligence (AI)</b> is a branch of computer science that deals with the simulation of intelligent behaviour by computers.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Main characteristics of AI</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>collection of data</li>
							<li>rules for using that data</li>
							<li>ability to reason</li>
							<li>ability to learn and adapt</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Categories of AI</h3>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Type</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Meaning</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Narrow AI</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Very good at one specific task</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">General AI</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Similar to a human at a task</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Strong AI</td><td class="px-3 py-2.5 text-sm text-cs-ok">Superior to humans at many tasks</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Reasoning, learning and adapting</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">AI can use data and rules to make decisions. It can learn from previous results and adapt its methods when new data appears. AI is good at spotting patterns and making predictions from very large amounts of data.</p>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Expert systems</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok">An <b>expert system</b> imitates the decision-making of a human expert in one specialised area.</p>
						<table class="my-3 w-full overflow-hidden rounded-2xl border border-cs-border [border-collapse:collapse]"><tbody>
							<tr><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Component</th><th class="border-b border-cs-border bg-[rgba(124,156,255,0.12)] px-3 py-2.5 text-left text-sm text-white">Function</th></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Knowledge base</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Stores facts and specialist knowledge</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Rule base</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Stores rules, often in IF...THEN form</td></tr>
							<tr><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Inference engine</td><td class="border-b border-cs-border px-3 py-2.5 text-sm text-cs-ok">Applies the rules to the facts to reach conclusions</td></tr>
							<tr><td class="px-3 py-2.5 text-sm text-cs-ok">Interface</td><td class="px-3 py-2.5 text-sm text-cs-ok">Allows user input and displays the result</td></tr>
						</tbody></table>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Basic operation of an expert system</h3>
						<ol class="mt-2 list-decimal pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>The user enters facts or answers questions through the interface.</li>
							<li>The system looks in the knowledge base for relevant facts.</li>
							<li>The inference engine uses the rule base to test possible conclusions.</li>
							<li>The system outputs advice, a diagnosis or a decision.</li>
						</ol>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Examples of expert system use</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>medical diagnosis</li>
							<li>mineral exploration</li>
							<li>banking and loan advice</li>
							<li>fault diagnosis in machinery</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Machine learning</h3>
						<p class="text-[15px] leading-[1.7] text-cs-ok"><b>Machine learning</b> is when a program can automatically adapt its own processes and/or data based on experience or training data.</p>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>It improves over time as it sees more examples.</li>
							<li>It is used in pattern recognition and prediction.</li>
							<li>Its quality depends heavily on the data used to train it.</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Examples of AI systems</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>smart home assistants</li>
							<li>chat bots</li>
							<li>news generation from live feeds</li>
							<li>pattern recognition in research data</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Advantages of AI</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>can store huge amounts of facts</li>
							<li>can process large data sets much faster than humans</li>
							<li>can spot patterns humans may miss</li>
							<li>can improve decision making in specialised areas</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Disadvantages / limitations of AI</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>depends on the data it is trained on</li>
							<li>may produce poor results if the data is biased or incomplete</li>
							<li>can change the skill set needed by humans</li>
							<li>does not always understand context like a human expert</li>
						</ul>
					</section>
				{:else if activeTab === 'tab-4'}
					<Flashcards
						title="Flashcards"
						badges={['Question / Answer', 'Loaded from JSON', 'Chapter 6 only']}
						chapterKey="chapter6"
						chapterLabel="Chapter 6"
					/>
				{:else}
					<section>
						<h2 class="mb-[14px] text-[28px] leading-[1.15] font-semibold">Quick Memorise List</h2>
						<div class="mb-2 flex flex-wrap">
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Fast recap</span>
							<span class="mb-2 mr-2 inline-block rounded-full border border-[rgba(124,156,255,0.3)] bg-[rgba(124,156,255,0.14)] px-[10px] py-[6px] text-xs text-white">Before exam</span>
						</div>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Must-know definitions</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li><b>Automated system</b>: system using sensors, microprocessors and actuators to work automatically</li>
							<li><b>Robotics</b>: design, construction and operation of robots</li>
							<li><b>Robot</b>: programmable machine with a structure, sensors/electrical parts and movement</li>
							<li><b>Independent robot</b>: autonomous robot with no direct human control</li>
							<li><b>Dependent robot</b>: robot that works with direct human interaction</li>
							<li><b>Artificial intelligence</b>: simulation of intelligent behaviour by computers</li>
							<li><b>Expert system</b>: AI system that imitates a human expert using facts and rules</li>
							<li><b>Machine learning</b>: program automatically adapts its own processes/data</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Things examiners love asking</h3>
						<ul class="mt-2 list-disc pl-[22px] text-[15px] leading-[1.7] text-cs-ok">
							<li>how sensors, microprocessors and actuators work together</li>
							<li>advantages and disadvantages of automated systems in different scenarios</li>
							<li>the three characteristics of a robot</li>
							<li>examples of where robots are used</li>
							<li>advantages and disadvantages of robots in industry or transport</li>
							<li>difference between robotics and AI</li>
							<li>components of an expert system</li>
							<li>difference between expert systems and machine learning</li>
							<li>how AI learns and adapts</li>
						</ul>

						<h3 class="mt-6 mb-[10px] text-lg text-cs-accent-2">Ultra-fast recap</h3>
						<div class="my-4 rounded-[18px] border border-cs-border bg-white/4 px-[18px] py-4 text-[15px] leading-[1.7] text-cs-ok">Automated systems use sensors to collect data, a microprocessor to decide what to do, and actuators to make physical changes. They are faster, safer and more consistent, but expensive and need maintenance. Robots must sense, move and be programmable. They are used in industry, transport, agriculture, medicine, domestic tasks and entertainment. AI simulates intelligent behaviour. Expert systems use a knowledge base, rule base, inference engine and interface. Machine learning adapts itself using data and experience.</div>
					</section>
				{/if}
			</main>
		</div>
	</div>
</div>
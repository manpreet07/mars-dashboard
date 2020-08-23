
// const baseUrl = 'https://marsdashboard.herokuapp.com'
const baseUrl = 'http://localhost:3000'

const store = Immutable.Map({
	apod: {},
	weather: {},
	rover: {}
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (async (newState) => {
	const state = store.mergeDeep(newState);
	return state;
})

const render = (async () => {
	root.innerHTML = await App()
})

// create content
const App = (async () => {
	const image = await imageOfTheDay();
	return `
        <header></header>
        <main>
            <section>
                <h2>Astronomy Picture of the Day</h2>
                ${image}
			</section>
		<div id="weather">
		${weather()}
		</div>
		<h2>Select Mars Rovers to view recent images sent by the rover</h2>
		<select id="rovers" onchange="roverData()">
			<option value="" selected disabled hidden>Choose Mars Rover</option>
			<option>Curiosity</option>
			<option>Opportunity</option>
			<option>Spirit</option>
		</select>
		<div id="rover-data"></div>
		</main>
    `
})

// listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
	await render()
})

const imageOfTheDay = (async () => {
	const state = await getImageOfTheDay()
	const apod = state.get('apod');
	// check if the photo of the day is actually type video!
	if (apod.media_type === "video") {
		return (`<div id:"apod-data">
			<iframe width="420" height="315" src="${apod.url}"></iframe>
            <p>${apod.title}</p>
			<p>${apod.explanation}</p>
			</div>
        `)
	} else {
		return (`
		<div id:"apod-data">
            <img src="${apod.url}" style="max-width:100%"/>
			<p>${apod.explanation}</p>
			</div>
        `)
	}
})

const getImageOfTheDay = (async () => {
	const response = await axios.get(`${baseUrl}/apod`)
	const state = Immutable.Map({ apod: response.data })
	return await updateStore(state)
})

const getRoverManifest = (async () => {
	try {
		const name = document.getElementById('rovers').value
		const response = await axios.get(`${baseUrl}/${name.toLowerCase()}`);
		const state = Immutable.Map(response.data);
		return state
	} catch (err) {
		response = err.response
		console.log('response:', response);
		return response
	}
})

const getRoverPhotos = (async () => {
	try {
		const name = document.getElementById('rovers').value
		const response = await axios.get(`${baseUrl}/${name.toLowerCase()}/photos`);
		const state = Immutable.Map(response.data);
		return state
	} catch (err) {
		response = err.response
		console.log('response:', response);
		return response
	}
})

const getMarsWeather = (async () => {
	try {
		const response = await axios.get(`${baseUrl}/insight_weather`);
		const state = Immutable.Map({ weather: response.data });
		return state
	} catch (err) {
		response = err.response
		console.log('response:', response);
		return response
	}
})

const roverData = (async () => {
	const roverManifest = await getRoverManifest();
	const roverPhotos = await getRoverPhotos();
	const state = roverManifest.mergeDeep(roverPhotos);
	const rover = state.get('rover');
	const roverName = document.getElementById('rovers').value
	const html = `<div>
				<h3>Rover: ${roverName}</h3>
				<p>Launch Date: ${rover.launch_date}</p>
				<p>Landing Date: ${rover.landing_date}</p>
				<p>Status: ${rover.status}</p>
				<p>Total photos taken: ${rover.total_photos}</p>
				</div>`
	let innerHTML = '';
	const photos = state.get('photos');
	for (const photo of photos) {
		innerHTML += `<div><p>${photo.camera.name}</p><img src="${photo.img_src}"/></div>`
	}
	const element = html + innerHTML;
	const rover_element = document.getElementById('rover-data');
	rover_element.innerHTML = element;
})

const weather = (async () => {
	const marsWeather = await getMarsWeather();
	const weather = marsWeather.get('weather');
	console.log('weather >>>>> ', weather)
	const html = `<h3>Latest Weather at Elysium Planitia</h3>`
	let innerHTML = '';
	for (const sol of weather.sol_keys) {
		innerHTML += `<div>
						<p>On Sol <b>${sol}</b> the temperature ranges from <b>${Math.round(weather[sol].AT.mn)}\xB0C</b> to <b>${Math.round(weather[sol].AT.mx)}\xB0C</b> with atmospheric pressure of <b>${Math.round(weather[sol].PRE.mn)} Pa.</b> to ${Math.round(weather[sol].AT.mn)} Pa.</b></p>
					</div>`
	}
	const element = html + innerHTML;
	const rover_element = document.getElementById('weather');
	rover_element.innerHTML = element;
})
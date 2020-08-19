
async function getApods() {
	const response = await axios.get('http://localhost:3000/apod');
	console.log(response.data)
	return response.data;
}

async function getImage() {
	const response = await getApods();
	const apod_div = document.getElementById('apod');
	const img_element = document.createElement('img');
	apod_div.appendChild(img_element);
	img_element.setAttribute('src', `${response.url}`)
}

// async function getRoverPhotos() {
// 	const rover = document.getElementById("rovers").value;
// 	const response = await axios.get(`http://localhost:3000/${rover}/photos`);
// 	console.log(response.data);
// 	const photos = response.data.photos;
// 	const rover_div = document.getElementById('rover');
// 	rover_div.innerHTML = renderRover(photos)
// 	return response.data
// }

function renderRover(photos) {
	const html = `<h1>Rover: ${photos[0].rover.name}</h1>`
	const innerHTML = []
	for (const photo of photos) {
		innerHTML.push(`<div class="gallery-card">
									<img src="${photo.img_src}">
						</div>`)
	}
	return html + innerHTML
}





const store = Immutable.Map({
	apod: {},
	rovers: [
		{
			name: 'Curiosity'
		},
		{
			name: 'Opportunity'
		},
		{
			name: 'Spirit'
		},
	]
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (async (newState) => {
	const state = store.merge(store, newState);
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
                <h3>Astronomy Pictue of the Day</h3>
                ${image}
			</section>
		</main>
		<h1>Select Mars Rovers from the dropdown</h1>
		<select id="rovers" onchange="roverData()">
			<option value="" selected disabled hidden>Choose Mars Rover</option>
			<option>Curiosity</option>
			<option>Opportunity</option>
			<option>Spirit</option>
		</select>
		<div id="rover-data"></div>
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
	const response = await axios.get(`http://localhost:3000/apod`)
	const state = Immutable.Map({ apod: response.data })
	return await updateStore(state)
})

const getRoverPhotos = (async () => {
	try {
		const name = document.getElementById('rovers').value
		const response = await axios.get(`http://localhost:3000/${name.toLowerCase()}/photos`);
		const state = Immutable.Map({
			rovers: [{
				name,
				photos: response.data
			}]
		});
		return await updateStore(state);
	} catch (err) {
		response = err.response
		console.log('response:', response);
		return response
	}
})

const roverData = (async () => {
	const state = await getRoverPhotos();
	const rover = document.getElementById('rovers').value
	const html = `<h1>Rover: ${rover}</h1>`
	let innerHTML = '';
	console.log('rover >>>>> ', state.get('rovers')[0])
	const roverData = state.get('rovers')[0].photos;
	for (const photo of roverData.photos) {
		innerHTML += `<div><p>${photo.camera.name}</p><img src="${photo.img_src}"/></div>`
	}
	const element = html + innerHTML;
	const rover_element = document.getElementById('rover-data');
	rover_element.innerHTML = element;
})
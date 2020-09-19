require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios').default;
const path = require('path')

const app = express();
const portNumber = +(process.env.PORT)
const port = portNumber ? portNumber : 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/apod', async (req, res) => {
    try {
		const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
		res.send(response.data)
    } catch (err) {
        console.log('response:', err.response);
	}
})

app.get('/insight_weather', async (req, res) => {
    try {
		const response = await axios.get(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`)
		res.send(response.data)
    } catch (err) {
		console.log('response:', err.response);
	}
})

app.get('/rovers/:name/photos', async (req, res) => {
    try {
		const name = req.params.name
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?sol=1000&api_key=${process.env.API_KEY}`)
		res.send(response.data)
    } catch (err) {
		console.log('response:', err.response);
	}
})

app.get('/rovers/:name', async (req, res) => {
    try {
		const name = req.params.name
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}?api_key=${process.env.API_KEY}`)
		res.send(response.data)
    } catch (err) {
		console.log('response:', err.response);
	}
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
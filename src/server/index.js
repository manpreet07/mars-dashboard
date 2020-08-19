require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios').default;
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/apod', async (req, res) => {
    try {
		const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
		res.send(response.data)
    } catch (err) {
		response = err.response
        console.log('response:', response);
	}
})

app.get('/curiosity/photos', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`)
		res.send(response.data)
    } catch (err) {
		response = err.response
        console.log('response:', response);
	}
})

app.get('/opportunity/photos', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1000&api_key=${process.env.API_KEY}`)
		res.send(response.data)
    } catch (err) {
		response = err.response
        console.log('response:', response);
	}
})

app.get('/spirit/photos', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=1000&api_key=${process.env.API_KEY}`)
		res.send(response.data)
    } catch (err) {
		response = err.response
        console.log('response:', response);
	}
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
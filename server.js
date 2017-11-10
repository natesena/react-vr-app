const
	dotenv = require('dotenv').load(),
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/react-vr-daddy',
	PORT = process.env.PORT || 3001,
	usersRoutes = require('./routes/users.js')
	vrTextsRoutes = require('./routes/vrTexts.js')

mongoose.connect(MONGODB_URI, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(cors())
app.use(express.static(`${__dirname}/client/vr`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
	res.json({message: "API root."})
})

app.use('/api/users', usersRoutes)
app.use('/api/vrTexts', vrTextsRoutes)

app.use('*', (req, res) => {
	console.log('from server start route')
	res.sendFile(`${__dirname}/client/vr/index.html`)
})

app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})
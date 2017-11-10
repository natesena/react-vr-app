const vrText = require('../models/VRText.js')


module.exports = {
	// list all 
	index: (req, res) => {
		vrText.find({}, (err, users) => {
			res.json(users)
		})
	},

	// get one user
	show: (req, res) => {
		console.log("Current User:")
		console.log(req.user)
		vrText.findById(req.params.id, (err, user) => {
			res.json(user)
		})
	},

	// create a new user
	create: (req, res) => {
		vrText.create(req.body, (err, user) => {
			console.log('inside of user create')
			console.log(req.body)
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a token to "log in":
			console.log('create function: user:', user)
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token, user})
		})
	},

	// update an existing user
	update: (req, res) => {
		vrText.findById(req.params.id, (err, user) => {
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				res.json({success: true, message: "User updated.", user})
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		vrText.findByIdAndRemove(req.params.id, (err, user) => {
			res.json({success: true, message: "User deleted.", user})
		})
	},


}
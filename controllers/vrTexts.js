const vrText = require('../models/VRText.js')


module.exports = {
	// list all texts on a view of a single homeowner
	index: (req, res) => {
		console.log('addVr Get Request', req)
		vrText.find({homeID: req.params.id}, (err, vrtexts) => {
			if(err) console.log(err)
			else{
				res.json(vrtexts)
			}
		})
	},

	// get one 
	show: (req, res) => {
		console.log("Current User:", req.user)
		
		vrText.findById(req.params.id, (err, vrtext) => {
			res.json(vrtext)
		})
	},

	// create a new vr text
	create: (req, res) => {
		vrText.create(req.body, (err, vrText) => {
			console.log('inside of vrText create')
			console.log(req.body)
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a token to "log in":
			console.log('create function: vrtext:', vrText)
			res.json({success: true, message: "VrText created. vrText attached.", vrText})
		})
	},

	// update an existing vrtext
	update: (req, res) => {
		vrText.findById(req.params.id, (err, vrtext) => {
			Object.assign(vrtext, req.body)
			vrtext.save((err, updatedvrtext) => {
				res.json({success: true, message: "User updated.", updatedvrtext})
			})
		})
	},

	// delete an existing vrtext
	destroy: (req, res) => {
		vrText.findByIdAndRemove(req.params.id, (err, vrtext) => {
			res.json({success: true, message: "vrtext deleted.", vrtext})
		})
	},


}
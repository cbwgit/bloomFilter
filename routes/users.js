const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Getting all
router.get('/', async function (req, res) {
	try {
		const users = await User.find()
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})
// Getting One 
router.get('/:id', getUser, function (req, res) {
	res.json(res.user)
})


// Creating one
router.post('/', async function (req, res) {
	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: req.body.password,
		university: req.body.university

	})
	try {
		const newUser = await user.save()
		res.status(201).json(newUser)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

router.patch('/:id', getUser, async function (req, res)  {
	if (req.body.email != null) {
	  res.user.email = req.body.email
	}
	if (req.body.name != null) {
	  res.user.name = req.body.name
	}
	  if (req.body.password != null) {
	  res.user.password = req.body.password
	}
	  if (req.body.university != null) {
	  res.user.university = req.body.university
	}
  
	try {
	  const updatedUser = await res.user.save()
	  res.json(updatedUser)
	} catch (err) {
	  res.status(400).json({ message: err.message })
	}
  })
  

// Delete One
router.delete('/:id', getUser, async function (req, res) {

	try {
		await res.user.remove()
		res.json({ message: 'Deleted User' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})



// get id 
async function getUser(req, res, next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if (user == null) {
			return res.status(404).json({ message: 'Cannot find user' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}

	res.user = user
	next()
}

module.exports = router
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Models
const User = require('../../models/User');

// @route POST api/users/join
// @desc Join user
// @access Public
router.post('/join', async (req, res) => {
	const { name, room } = req.body;

	const user = await User.findOne({ name: name });

	if (user) {
		return res.status(400).json({ name: 'This username is already taken!' });
	}

	const newUser = new User({
		name,
		room
	});

	newUser.save().then((user) => res.json(user)).catch((error) => console.log(error));
});

router.post('/login', async (req, res) => {
	const { name } = req.body;

	const user = await User.findOne({ name: name });

	if (!user) {
		return res.status(400).json({ name: 'Incorrect credentials, please try again!' });
	}

	const token = jwt.sign(
		{
			name: name
		},
		'jhfuewwehjsfjhvbwpwoeqwe'
	);

	res.status(200).json({ token: token, name: name });
});

module.exports = router;

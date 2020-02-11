const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isAuth = require('../../middleware/is-auth');

// Models
const User = require('../../models/User');

// @route POST api/users/join
// @desc Join user
// @access Public
router.post('/join', async (req, res) => {
	const { name, room, password } = req.body;

	const user = await User.findOne({ name: name });

	if (user) {
		return res.status(400).json({ name: 'This username is already taken!' });
	}

	const newUser = new User({
		name,
		room,
		password
	});

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;

			newUser.save().then((user) => res.json(user)).catch((error) => console.log(error));
		});
	});
});

// @route POST api/users/login
// @desc Login user to app
// @access Public
router.post('/login', async (req, res) => {
	const { name, password } = req.body;

	const user = await User.findOne({ name: name });

	if (!user) {
		return res.status(400).json({ message: 'User not found, please create an account!' });
	}

	bcrypt
		.compare(password, user.password)
		.then((isMatched) => {
			if (isMatched) {
				const token = jwt.sign(
					{
						name: name,
						password: password
					},
					'jhfuewwehjsfjhvbwpwoeqwe'
				);

				res.status(200).json({ token: token, name: name });
			} else {
				return res.status(400).json({ message: 'Password is incorrect' });
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

// @route POST api/users/:username
// @desc Get all users in app
// @access Protected
router.get('/:username', isAuth, (req, res) => {
	if (!req.isAuth) {
		return res.status(404).json({ message: 'Unauthorized' });
	}

	User.find({ name: { $ne: req.params.username } })
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;

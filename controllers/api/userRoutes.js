/* eslint-disable no-unused-vars */
// Requiring our models and passport as we've configured it

const router = require('express').Router();
const { User } = require('../../models');

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post('/login', async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        console.log(user);

        if (!user) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(402).json({ message: 'No user account found!' });
            return;
        }

        const { password, ...userDetails } = user.get({ plain: true });

        console.log(userDetails)
        req.session.save(() => {
            req.session.user = userDetails;
            req.session.loggedIn = true;

            res.json({ user: userDetails, message: 'You are now logged in!' });
        });
        console.log(req.session.user)
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'No user account found!' });
    }
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(newUser)
        console.log("check here")
        // excludes password.
        const { password, ...userDetails } = newUser.get({ plain: true });

        req.session.save(() => {
            req.session.user = userDetails;
            req.session.loggedIn = true;

            res.json(userDetails);
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.put('/updateBio', async (req, res) => {
    try {
        const newUser = await User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            bio: req.body.bio,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(newUser)
        console.log("check here")
        // excludes password.
        const { password, ...userDetails } = newUser.get({ plain: true });

        req.session.save(() => {
            req.session.user = userDetails;
            req.session.loggedIn = true;

            res.json(userDetails);
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Route for logging user out
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

// Route for getting some data about our user to be used client side
router.get('/data', (req, res) => {
    if (!req.session.loggedIn) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json(req.session.user);
    }
});

module.exports = router;

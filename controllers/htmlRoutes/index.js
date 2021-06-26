// Requiring path to so we can use relative routes to our HTML files
const express = require('express');
// Requiring our custom middleware for checking if a user is logged in
const withAuth = require('../../utils/withAuth');
const router = express.Router();
const { User, Post , Comment} = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });
        const posts = postData.map((pst) => pst.get({ plain: true }));
        
        const userData = await User.findAll();
        const users = userData.map((usr) => usr.get({ plain: true }));

        res.render('index', {
            posts: posts,
            users: users,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/dashboard' , withAuth, async (req,res) => {
    try{
        const postData = await Post.findAll({
            where: {
                author_id: req.session.user.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });

        const posts = postData.map((pst) => pst.get({ plain: true }));
        console.log(posts)

        res.render('dashboard', {
            posts: posts,
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        })

    } catch (err) {
        console.log(err)
    }
})

router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });

        const posts = postData.map((pst) => pst.get({ plain: true }));

        res.render('posts', {
            posts: posts,
            loggedIn: req.session.loggedIn,
        })

    } catch (err) {
        console.log(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        //Get post and format
        const postId = req.params.id;
        const postData = await (await Post.findByPk(postId))
        const post = await postData.get({plain:true});
        
        //Get author of post
        const authorId = post.author_id;
        const authorData = await User.findByPk(authorId)
        const author = await authorData.get({plain:true});

        //Get comments for post
        const commentsData = await Comment.findAll({
            where: {
                post_id: postId,
            }
        })
        const comments = commentsData.map((cmt) => cmt.get({plain:true}))
        console.log(comments)
        res.render('viewPost', {
            post,
            author,
            comments,
            loggedIn: req.session.loggedIn,
        })

    } catch (err) {
        console.log(err);
    }
});

//This needs to be shifted into api routes
router.post('/comment', withAuth, async (req, res) => {
    try {
        
        const result = await Comment.create(
            {
                content: req.body.content,
                user_id: req.body.authorId,
                post_id: req.body.postId,
            },
        );

    } catch (err) {
        console.log(err);
    }
});

//This needs to be shifted into api routes
router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('newPost', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        })

    } catch (err) {
        console.log(err);
    }
});

//This needs to be shifted into api routes
router.post('/post/new', withAuth, async (req, res) => {
    try {
        
        const authorId = req.session.user.id;

        const result = await Post.create(
            {
                title: req.body.title,
                content: req.body.content,
                author_id: authorId,
            },
        );

    } catch (err) {
        console.log(err);
    }
});

//This needs to be shifted into api routes
router.get('/bio/edit', withAuth, async (req, res) => {
    try {
        res.render('bioupdate', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        })

    } catch (err) {
        console.log(err);
    }
});

// Here we've add our isAuthenticated middleware to this route.
// User can update their owned project briefs
/* router.get('/brief/:briefId/edit', withAuth, async (req, res) => {
    //withAuth, add this in after the first argument when ready
    try {
        const briefData = await Brief.findByPk(req.params.briefId);
        const brief = await briefData.get({ plain: true });
        const image = await Image.findByPk(brief.image_id);

        res.render('briefForm', {
            brief,
            type: 'edit',
            imagepath: image.dataValues.path,
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
    }
}); */

//withAuth, add this in after the first argument when ready
router.get('/login', async (req, res) => {
    res.render('login');
});

//withAuth, add this in after the first argument when ready
router.get('/signup', async (req, res) => {
    res.render('signup');
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

module.exports = router;

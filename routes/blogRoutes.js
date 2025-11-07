const express = require('express');
const Blog = require('../model/blog');

const router = express.Router();

router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((blogs) => {
            res.render('index', { title: 'All Blogs', blogs })
        })
        .catch((err) => console.log(err))
})

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => console.log(err))
})

router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' })
})

router.get('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => console.log(err))
})


router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
})




module.exports = router
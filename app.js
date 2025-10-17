const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./model/blog');

// express app
const app = express();

// Registe View Engine
app.set('view engine', 'ejs')
// app.set('views', 'new file name')


// Connect to MongoDB
const dbURI = 'mongodb+srv://beato:beato1234@peractice.216e0rk.mongodb.net/mongoPractice?retryWrites=true&w=majority&appName=peractice'

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Static Files
app.use(express.static('public'))


// app.use((req, res,next) => {
//     console.log('New Request was Made:');
//     console.log('Host:', req.hostname);
//     console.log('Path:', req.path);
//     console.log('Method:', req.method);
//     next();
// })
app.use(morgan('tiny'));

// adding blog
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog 2',
        body: 'Lorem ipsum dolor sit amet consectetur.'
    });

    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
})

// getting all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
})

// getting single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('68f279735fb17547b89b8a1e')
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
})

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Bahram in Journey', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        { title: 'How to Fix Bugs', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        { title: 'NASA Finds Water in a Planet', snippet: 'Lorem ipsum dolor sit amet consectetur.' }
    ]
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' })
})

// Readirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
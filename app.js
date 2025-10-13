const express = require('express');
const morgan = require('morgan');


// express app
const app = express();

// Registe View Engine
app.set('view engine', 'ejs')
// app.set('views', 'new file name')

// listen for request
app.listen(3000);

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
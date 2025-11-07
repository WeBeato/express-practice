const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

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


// Middleware & Static Files
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))


app.use(morgan('tiny'));


// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// Blog Routes
app.use('/blogs',blogRoutes)

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
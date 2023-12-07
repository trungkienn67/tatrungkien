const express = require('express')
const expressHandlebars = require('express-handlebars').engine;

const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', expressHandlebars({defaultLayout: 'main',}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const product = [
    {name: 'Product1', image: '/img/product1.jpg'},
    {name: 'Product2', image: '/img/product2.jpg'},
]

app.get('/', (req, res) => {
    res.render('home', {title: 'Home Page', message: 'wellcome to our website'});
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us', message: 'Learn more about our company'});
})

app.get('/product', (req, res) => {
    res.render('product', { product });
})

app.use((req, res) => { 
    res.status(404) 
    res.render('404', {title: '404 Not Found'}) 
})

app.use((err, req, res, next) => { 
    console.error(err.message) 
    res.status(500) 
    res.render('500', {title: '500 internal sever error'}) 
})

app.listen(port, () => console.log( 
    `Express started on http://localhost:${port}; ` + 
    `press Ctrl-C to terminate.`))

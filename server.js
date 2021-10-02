const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const {v4:uuidv4} = require("uuid")
const router = require("./router")

const PORT = 8000;

//body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))

//Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

//session
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.set('views', './views')
app.set('view engine', 'ejs');

app.use('/route',router)
//Home route

app.get('/', (req, res) => {
    res.render('base', {title: "Login System"})
})
app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})
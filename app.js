const express = require('express');

// app.engine('ejs', ejsMate)
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))
// app.use(express.urlencoded({ extended: true }))
// app.use(methodOverride('_method'))
// app.use(express.static(path.join(__dirname, 'public')))

const app = express();

app.get('/', (req,res) => {
    res.send("Home Page")
})

app.get('/client', (req,res) => {
    res.send("Client Page")
})

app.get('/status',(req,res) => {
    res.send("Status of Order Food")
})

app.get('/admin',(req,res) => {
    res.send("Admin Page")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})


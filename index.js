import express from 'express';

const app = express();

const PORT = 3000;

app.get('/home', (req, res) => {
    res.send('Hello World');
})

app.listen((PORT),() => {console.log(`Your app listening on port ${PORT}`);});


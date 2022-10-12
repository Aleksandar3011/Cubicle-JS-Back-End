const express = require('express');
const { initDatabase } = require('./config/database');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware');

const app = express();

require('./config/handlebars')(app);

app.use(cookieParser());
app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(auth);

app.use(routes);
initDatabase()
    .then(() => {
        app.listen(5000, () => console.log(`Server is listening on port 5000...`));
    })
    .catch((err) => {
        console.log('Cannot connect to db:', err);
    });
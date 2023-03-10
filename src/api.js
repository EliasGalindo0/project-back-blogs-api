const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middlewares/errorMiddleware');
const categoryRoute = require('./routes/categoryRoute');
const loginRoute = require('./routes/loginRoute');
const postRoute = require('./routes/postRoute');
const usersRoute = require('./routes/usersRoute');

// ...
const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', usersRoute);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);
app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

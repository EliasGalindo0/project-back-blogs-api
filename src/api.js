const express = require('express');
require('express-async-errors');
const errorHandler = require('./middlewares/errorHandler');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');

// ...

const app = express();

app.use(express.json());

app.use('/login', authRoute);
app.use('/user', usersRoute);
app.use(errorHandler);
app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');

// ...

const app = express();

app.use(express.json());

app.use('/login', authRoute);
app.use('/users', usersRoute);
app.use(errorHandler);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

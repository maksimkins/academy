const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./config/database');
const createRoles = require('./utils/createRoles') 

const app = express();


app.use(bodyParser.json());
app.use(cors());      

const identityRoutes = require('./routes/identityRoutes');
app.use('/api/identity', identityRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

sequelize.sync().then(() => {

    createRoles();

    app.listen(5000, () => {
        console.log('Server is running http://localhost:5000');

  });
});
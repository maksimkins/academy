const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const sequelize = require('./config/database');
const createRoles = require('./utils/createRoles') 
const setUpMessageSocket = require('./sockets/messageSocket');

const app = express();
const server = http.createServer(app);
setUpMessageSocket(server);

app.use(bodyParser.json());
app.use(cors());      

const identityRoutes = require('./routes/identityRoutes');
app.use('/api/identity', identityRoutes);

const homeworkRoutes = require('./routes/homeworkRoutes');
app.use('/api/hw', homeworkRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/api/group', groupRoutes);

sequelize.sync().then(() => {

    createRoles();

    app.listen(5000, () => {
        console.log('Server is running http://localhost:5000');

  });
});
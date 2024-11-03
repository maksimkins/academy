const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

const User = require("./models/User");
const Group = require("./models/Group");
const UserGroup = require("./models/UserGroup");
const Role = require("./models/Role");

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use('/api', );        

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running http://localhost:5000');

    


  });
});
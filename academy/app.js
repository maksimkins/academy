const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

const Role = require('./models/Role')

app.use(bodyParser.json());
app.use(cors());      

const identityRoutes = require('./routes/identityRoutes');
app.use('/api/identity', identityRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running http://localhost:5000');


    (async () => {
        await sequelize.sync();
    
        try {
            
            const [adminRole, createdAdminRole] = await Role.findOrCreate({
                where: { name: 'Admin' }, 
                defaults: { name: 'Admin' } 
            });
    
            const [userRole, createdUserRole] = await Role.findOrCreate({
                where: { name: 'User' },
                defaults: { name: 'User' }
            });

            if (createdAdminRole) {
                console.log('Admin role created');
            } else {
                console.log('Admin role already exists');
            }
    
            if (createdUserRole) {
                console.log('User role created');
            } else {
                console.log('User role already exists');
            }


    
        } catch (error) {
            console.error("Error:", error.message);
        }
    })();
  });
});
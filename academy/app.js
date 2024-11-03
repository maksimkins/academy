const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');

const app = express();

const Role = require('./models/Role')

app.use(bodyParser.json());
app.use(cors());      

const identityRoutes = require('./routes/identityRoutes');
app.use('/api/identity', identityRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running http://localhost:5000');


    (async () => {
        await sequelize.sync();
    
        try {
            // Creating roles
            const [adminRole, createdAdminRole] = await Role.findOrCreate({
                where: { name: 'Admin' }, // Change to 'roleName' as per your model
                defaults: { name: 'Admin' } // Defaults for the role
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


    
            // // Creating users
            // const user1 = await User.create({
            //     username: 'john_doe',
            //     email: 'john@example.com',
            //     password: 'Password1!',
            //     roleId: adminRole.id
            // });
    
            // const user2 = await User.create({
            //     username: 'jane_doe',
            //     email: 'jane@example.com',
            //     password: 'Password1!',
            //     roleId: userRole.id
            // });
    
            // // Creating groups
            // const group1 = await Group.create({ name: 'Developers' });
            // const group2 = await Group.create({ name: 'Designers' });
    
            // Adding users to groups
            // await user1.addGroup(group1);
            // await user1.addGroup(group2);
            // await user2.addGroup(group1);
    
            // Fetching users with their groups
            // const usersWithGroups = await User.findAll({
            //     include: [{ model: Group, as: 'groups' }]
            // });

    
        } catch (error) {
            console.error("Error:", error.message);
        }
    })();
  });
});
const Role = require('../models/Role')

const createRoles = async () => {
    try {
            
        const [adminRole, createdAdminRole] = await Role.findOrCreate({
            where: { name: 'Admin' }, 
            defaults: { name: 'Admin' } 
        });

        const [userRole, createdUserRole] = await Role.findOrCreate({
            where: { name: 'User' },
            defaults: { name: 'User' }
        });

        const [teacherRole, createdTeacherRole] = await Role.findOrCreate({
            where: { name: 'Teacher' },
            defaults: { name: 'Teacher' }
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

        if (createdTeacherRole) {
            console.log('Teacher role created');
        } else {
            console.log('Teacher role already exists');
        }



    } catch (error) {
        console.error("Error:", error.message);
    }
}

module.exports = createRoles;
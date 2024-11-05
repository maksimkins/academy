const User = require('../models/User');
const Homework = require('../models/Homework');
const Mark = require('../models/Mark');


const setMark = async (req, res) => {
    const teacherId = req.user.id;
    const { studentId, homeworkId, mark } = req.body;

    try {

        if (mark < 0 || mark > 12) {
            return res.status(400).json({ error: 'Mark must be between 0 and 12.' });
        }
       
        const student = await User.findByPk(studentId);
        const homework = await Homework.findByPk(homeworkId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        if (!homework) {
            return res.status(404).json({ error: 'Homework not found.' });
        }

        let studentMark = await Mark.findOne({
            where: {
                teacherId: teacherId,
                studentId: studentId,
                homeworkId: homeworkId
            }
        });

        if (studentMark) {
            studentMark.mark = mark;
            await studentMark.save();
            res.status(200).json({ message: 'Mark updated successfully.'});
        } else {
            studentMark = await Mark.create({
                teacherId: teacherId,
                studentId: studentId,
                homeworkId: homeworkId,
                mark: mark
            });
            res.status(201).json({ message: 'Mark set successfully'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while setting the mark.' });
    }
}




module.exports = {
    setMark
};



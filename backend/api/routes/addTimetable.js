const express = require('express');
const router = express.Router();
const { addTimetable, getTeacher, deleteTimetableLesson } = require('../../database/database');

router.post('/', async (req, res) => {
    const group = req.body.group;

    const subjectsArr = req.body.subjectsarr;

    const week = req.body.week;

    if (!group) {
        res.status(400).json({ success: false, message: 'No group name provided!' });
    }

    if (group === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    if (!subjectsArr) {
        res.status(400).json({ success: false, message: 'No subjects arr provided!' });
    }

    if (subjectsArr === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    if (!week) {
        res.status(400).json({ success: false, message: 'No week name provided!' });
    }

    if (week === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    try {
        for (const obj in subjectsArr) {
            if (subjectsArr[obj]['subject'] !== null && subjectsArr[obj]['subject'] !== undefined && subjectsArr[obj]['subject'] !== '') {
                const teacherQuery = await getTeacher(subjectsArr[obj]['subject']);

                await addTimetable(group, `${teacherQuery.last_name} ${teacherQuery.first_name}`, teacherQuery.classroom, subjectsArr[obj]['subject'], subjectsArr[obj]['daylnum'], week);
            } else {
                await deleteTimetableLesson(subjectsArr[obj]['daylnum'], week, group);
            }
        }        

        res.status(200).json({ message: 'added' });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
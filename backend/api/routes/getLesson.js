const express = require('express');
const router = express.Router();
const { getLesson } = require('../../database/database');

router.get('/', async (req, res) => {
    const { daylnum, week, group } = req.query;

    if (!daylnum) {
        return res.status(400).json({ message: 'No daylnum provided!' });
    }

    if (daylnum === null) {
        return res.status(404).json({ message: 'Found nothing!' });
    }

    if (!week) {
        return res.status(400).json({ message: 'No week provided!' });
    }

    if (week === null) {
        return res.status(404).json({ message: 'Found nothing!' });
    }

    if (!group) {
        return res.status(400).json({ message: 'No group provided!' });
    }

    if (group === null) {
        return res.status(404).json({ message: 'Found nothing!' });
    }

    try {
        const query = await getLesson(daylnum, week, group);

        if (query !== null) {
            const resp = {
                lesson: query.lesson,
                teacher: query.teacher,
                classroom: query.classroom
            };
    
            return res.status(200).json(resp);
        } else {
            return res.status(404).json({ message: 'Found nothing' });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
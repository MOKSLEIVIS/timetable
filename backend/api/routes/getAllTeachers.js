const express = require('express');
const router = express.Router();
const { getAllTeachers } = require('../../database/database');

router.get('/', async (req, res) => {
    try {
        const query = await getAllTeachers();

        if (query !== null) {
            const resp = {
                data: query.map(item => ({
                    firstname: item.first_name,
                    lastname: item.last_name,
                    classroom: item.classroom,
                    subject: item.subject,
                    group: item.teacher_group,
                    id: item.teacher_id
                }))
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
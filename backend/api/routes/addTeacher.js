const express = require('express');
const router = express.Router();
const { addTeacher } = require('../../database/database');

router.post('/', async (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const classroom = req.body.classroom;
    const subject = req.body.subject;
    const group = req.body.group;

    if (!firstName) {
        res.status(400).json({ success: false, message: 'No teacher first name provided!' });
    }

    if (firstName === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    if (!lastName) {
        res.status(400).json({ success: false, message: 'No teacher last name provided!' });
    }

    if (lastName === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    if (!classroom) {
        res.status(400).json({ success: false, message: 'No teacher classroom provided!' });
    }

    if (classroom === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    if (!subject) {
        res.status(400).json({ success: false, message: 'No teacher subject provided!' });
    }

    if (subject === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    try {
        const query = await addTeacher(firstName, lastName, classroom, subject, group);

        if (query !== null) {    
            res.status(200).json({ success: query });
        } else {
            return res.status(500).json({ success: false });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { deleteTeacher } = require('../../database/database');

router.post('/', async (req, res) => {
    const id = req.body.id;

    if (!id) {
        res.status(400).json({ success: false, message: 'No teacher id provided!' });
    }

    if (id === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    try {
        const query = await deleteTeacher(id);

        res.status(200).json({ success: query });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
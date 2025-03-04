const express = require('express');
const router = express.Router();
const { deleteWeek } = require('../../database/database');

router.post('/', async (req, res) => {
    const name = req.body.name;

    if (!name) {
        res.status(400).json({ success: false, message: 'No week name provided!' });
    }

    if (name === null) {
        res.status(400).json({ success: false, message: 'Failed!' });
    }

    try {
        const query = await deleteWeek(name);

        res.status(200).json({ success: query });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
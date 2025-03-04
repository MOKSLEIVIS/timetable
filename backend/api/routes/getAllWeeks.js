const express = require('express');
const router = express.Router();
const { getAllWeeks } = require('../../database/database');

router.get('/', async (req, res) => {
    try {
        const query = await getAllWeeks();

        if (query !== null) {
            const resp = {
                data: query.map(item => ({
                    name: item.name,
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
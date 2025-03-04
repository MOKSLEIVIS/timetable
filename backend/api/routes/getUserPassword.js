const express = require('express');
const router = express.Router();
const { getUserPassword } = require('../../database/database');

router.get('/', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: 'No username provided!' });
    }

    if (username === null) {
        return res.status(404).json({ message: 'Found nothing!' });
    }

    try {
        const query = await getUserPassword(username);

        if (query !== null) {
            const resp = {
                user_id: query.user_id,
                password: query.password
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
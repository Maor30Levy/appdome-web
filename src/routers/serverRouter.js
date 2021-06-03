const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { https } = require('follow-redirects');
const router = new express.Router();

router.post('/server', async (req, res) => {
    const serverURL = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;
    try {
        console.log(serverURL, req.body)
        const result = await axios.post(serverURL, req.body, {
            httpsAgent: new https.Agent({ ca: fs.readFileSync(path.join(__dirname, '../../cert', 'cert.pem')), rejectUnauthorized: false })
        }
        );
        return res.send(result.data);
    } catch (err) {
        console.log(err)
        if (err.response?.status)
            return res.status(err.response.status).send(err.response.data);

        else return res.status(400).send(err);
    }
});


module.exports = router;
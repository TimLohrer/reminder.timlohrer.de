const fetch = require('node-fetch-commonjs');
const { Router } = require('express');
const oauthRouter = Router();

oauthRouter.get('/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({
            message: 'Code can not be empty!'
        });
    }
    const body = new URLSearchParams();
    body.append('client_id', process.env.CLIENT_ID);
    body.append('client_secret', process.env.CLIENT_SECRET);
    body.append('grant_type', 'authorization_code');
    body.append('code', code);
    body.append('redirect_uri', 'https://api.reminder.timlohrer.de/oauth/callback');
    let _res = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });
    _res = await _res.json();
    if (_res.error) {
        return res.status(500).json({
            message: 'Something went wrong!'
        });
    }
    res.redirect(`https://reminder.timlohrer.de?access_token=${_res.access_token}&expires_in=${_res.expires_in}&refresh_token=${_res.refresh_token}`);
});

// oauthRouter.post('/refresh/:refresh_token', async (req, res) => {
//     const { refresh_token } = req.params;

//     const body = new URLSearchParams();
//     body.append('client_id', process.env.CLIENT_ID);
//     body.append('client_secret', process.env.CLIENT_SECRET);
//     body.append('grant_type', 'refresh_token');
//     body.append('refresh_token', refresh_token);
//     let _res = await fetch('https://discord.com/api/oauth2/token', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: body
//     });
//     _res = await _res.json();
//     if (_res.error) {
//         console.log(_res);
//         return res.status(500).json({
//             message: 'Something went wrong!'
//         });
//     }
//     res.redirect(`https://reminder.timlohrer.de?acces_token=${_res.access_token}&expires_in=${_res.expires_in}&refresh_token=${refresh_token}`);
// });

module.exports = oauthRouter;
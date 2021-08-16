// app.js
const express = require('express');
var cors = require('cors');

// Create Express app
const app = express();
app.use(cors());

const fs = require('fs');

let readFile = file => {
    let rawdata = fs.readFileSync(file);
    return JSON.parse(rawdata);
};
// viewtype   ---------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/v2/viewtype/project/4060741400369946720', (req, res) => res.send('burnupchart'));
// milestones ---------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/projects/4060741400369946720/milestones', (req, res) => res.json(readFile('public/milestones.json')));
// contracts ---------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/v2/projects/4060741400369946720/contracts', (req, res) => res.json(readFile('public/contracts.json')));

// taximeter ----------------------------------------------------------------------------------------------------------
// app.get('/dmpl/api/v2/burnup/project/4060741400369946720', (req, res) => res.json(readFile('public/taximeter.json')));

// burnup ----------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/v2/burnup/project/4060741400369946720/55', (req, res) => res.json(readFile('public/burnup.json')));

// discrete ----------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/v2/discrete/project/4060741400369946720/55', (req, res) => res.json(readFile('public/discrete.json')));

// common info ----------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/v2/info/project/4060741400369946720', (req, res) => res.json(readFile('public/info.json')));

// project -------------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/taximeter/project/4060741400008560770', (req, res) => res.json(readFile('public/resp-project.json')));

// project fixed price -------------------------------------------------------------------------------------------------
app.get('/dmpl/api/taximeter/project/4060741400369946720', (req, res) => res.json(readFile('public/resp-fixed-price.json')));

// errors --------------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/taximeter/project/401', (req, res) => res.status(401).send('No permission 401'));
app.get('/dmpl/api/taximeter/project/403', (req, res) => res.status(403).send(readFile('public/403Res.json')));
app.get('/dmpl/api/taximeter/project/404', (req, res) => res.status(404).send('Not found'));

// user info -----------------------------------------------------------------------------------------------------------
app.get('/dmpl/api/user/info', (req, res) => res.json(readFile('public/user-info.json')));

// permissions for user ------------------------------------------------------------------------------------------------
app.get('/dmpl/api/security/user/Georgy_Nikitin@epam.com/permission/taximeter/', (req, res) => res.json(readFile('public/security-user.json')));

// ---------------------------------------------------------------------------------------------------------------------
// save cost limit ----------------------
app.put('/dmpl/api/taximeter/1146725/costlimit', (req, res) => {
    setTimeout(() => res.json({"costLimitSelected":false,"costLimit":3.375E+5,"targetAccountMargin":0.25,"expectedRevenue":550000,"comment":"test","updatedDate":"2020-11-16","modifier":{"id":6870457,"firstName":"Alisa","lastName":"Isterina"}}), 1000);
});

// ---------------------------------------------------------------------------------------------------------------------
// sace scope completion ----------------
app.put('/dmpl/api/taximeter/1146725/scopecompletion', (req, res) => {
    setTimeout(() => res.json({"comment":"test","manualScopeCompletionSelected":true,"scopeCompletion":0.75}), 1000);
});

// get support email for errors 401 and 430 ----------------------------------------------------------------------------
app.get('/dmpl/api/supportEmail', (req, res) => res.status(200).send("DMPL-support@email.com"));

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))
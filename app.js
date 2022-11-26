const express = require('express');
const cors = require('cors');
const signale = require('signale');
const { AppEnv } = require('./src/enviroment/env');
const { initialDB } = require('./src/configs/database.cf');
const { configRoute } = require('./src/configs/route.cf');

const app = express();

app.use(cors());
configRoute(app);
initialDB();

app.listen(AppEnv.PORT, () => {
    signale.success(`[App] Server started on port ${AppEnv.PORT}`);
})

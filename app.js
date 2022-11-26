const express = require('express');
const cors = require('cors');
const signale = require('signale');
const { AppEnv } = require('./src/enviroment/env');
const { initialDB } = require('./src/configs/database.cf');
const { configRoute } = require('./src/configs/route.cf');
const { hanleErrors } = require('./src/libs/errors');

const app = express();

app.use(cors());
configRoute(app);
initialDB();
hanleErrors(app);
signale.success('[App] Errors handling initial success');

app.listen(AppEnv.PORT, () => {
    signale.success(`[App] Server started on port ${AppEnv.PORT}`);
})

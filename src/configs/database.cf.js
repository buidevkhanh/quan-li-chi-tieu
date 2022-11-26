const mongoose = require("mongoose");
const signale = require('signale');
const { AppEnv } = require("../enviroment/env");

exports.initialDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(AppEnv.DATABASE_CONFIG).then(() => {
            signale.success('[App] MongoDB connected');
        }).catch((error) => {
            signale.error(`[App] Unable connect to database, error: ${error}`);
        })
    });
}

exports.mongoose = mongoose;
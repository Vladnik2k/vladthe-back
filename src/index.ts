import {Express} from "express";
const configs = require('./configs');

const app: Express = require('./app');

app.listen(configs.port, () => console.log(`Server started at http://localhost:${configs.port}`));

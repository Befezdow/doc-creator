import express, {Express, Response} from 'express';
import { ValidationError } from "express-json-validator-middleware";
import {ErrorHandleFunction} from "connect";
import {DataSourceInstance} from "./database/data-source";
import {config} from "./config";
import {addRouteHandlers} from "./routes";

const handleError: ErrorHandleFunction = (error, request, response, next) => {
    // Check the error is a validation error
    if (error instanceof ValidationError) {
        // Handle the error
        (response as Response).status(400).send(error.validationErrors);
        next();
    } else {
        // Pass error on if not a validation error
        next(error);
    }
}

async function init() {
    // init database
    try {
        await DataSourceInstance.initialize();
        console.log("Data Source has been initialized!")
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
        return;
    }

    // init express instance
    const app: Express = express();
    app.use(express.json());

    // add route handlers
    addRouteHandlers(app);

    // add errors handler
    app.use(handleError);

    // start listening
    app.listen(config.port, () => {
        console.log(`Server is running at http://localhost:${config.port}`);
    });
}

init();
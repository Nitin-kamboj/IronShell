import express from "express";
import  router  from "./routers/ironShell.routes.js";
import { errorHandler } from "./middlewares/error.js"

export function createApp() {
    const app = express();
    app.use(express.json());
    // Routes
    app.use("/api", router);

    // Error Handler 
    app.use(errorHandler);
    return app;
}
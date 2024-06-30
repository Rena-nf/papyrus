import history from "connect-history-api-fallback"
import * as cors from "cors"
import * as exp from "express"
import { Request, Response, NextFunction } from "express"
import session from "express-session"

import { Passport } from "./auth"

// Mongo related import
import MongoSession from "connect-mongo"
import mongoose from "mongoose"

const Controller: exp.Application = exp()

const RateLimiter = () => {
    
}
 
Controller.use(history)
Controller.use(cors())
Controller.use(exp.urlencoded({extended: true}))
Controller.use(Passport.initialize())
Controller.use(Passport.session())

// Mongoose & connect-mongo stuff
const MongoUri: string | undefined = process.env.MONGO_URL as string
const db_inst = mongoose.connect(MongoUri).then(m => m.connection.getClient())

Controller.use(
    session({
        secret: process.env.SESSION_PASS as string | "",
        resave: true,
        saveUninitialized: true,
        store: MongoSession.create({
            clientPromise: db_inst,
            ttl: 30 * 24 * 60 * 60, // 30 days expiration date
            autoRemove: "interval",
            autoRemoveInterval: 60 // 60 minutes removal interval 
        })
    })
)

// Routing
const checkIfLogged = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).send("User not authorized / Not logged in")
    }
}

Controller.get("/", checkIfLogged, () => {
     
})
import bodyparser from "body-parser"
import history from "connect-history-api-fallback"
import * as cors from "cors"
import * as exp from "express"
import { Request, Response, NextFunction } from "express"
import session from "express-session"
import {rateLimit, RateLimitRequestHandler} from "express-rate-limit"
import helmet from "helmet"

import { Passport } from "./auth"

// Mongo related import
import MongoSession from "connect-mongo"
import mongoose from "mongoose"

const Controller: exp.Application = exp()

const RateLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 30 * 60 * 100,
    limit: 200,
    message: "Limit reached, blocking request"
})
 
const Helmet = helmet({
    contentSecurityPolicy: {
        directives: {
            "fontSrc": [
                "'self'",
                'fonts.googleapis.com/icon?family=Material+Icons',
                'fonts.googleapis.com/*',
                'fonts.googleapis.com/',
                'googleapis.com/*',
                'googleapis.com/',

                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css',
                'cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css',
                "'unsafe-inline'",
            ],
            "scriptSrc": [
                "'self'",
            ]
        }
    }
})

const BodyParserJson = bodyparser.json({
    limit: "100kb",
    strict: true,
})

const BodyParserRaw = bodyparser.raw({
    limit: "100kb",
})

const BodyParserText = bodyparser.text({
    limit: "100kb",
    defaultCharset: "utf-8",
})

const BodyParserUrl = bodyparser.urlencoded({
    limit: "100kb",
    extended: true,
})

Controller.use(BodyParserJson)
Controller.use(BodyParserRaw)
Controller.use(BodyParserText)
Controller.use(BodyParserUrl)
Controller.use(cors())
Controller.use(exp.urlencoded({extended: true}))
Controller.use(Helmet)
Controller.use(history)
Controller.use(Passport.initialize())
Controller.use(Passport.session())
Controller.use(RateLimiter)

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
import bodyparser from "body-parser"
import history from "connect-history-api-fallback"
import exp from "express"
import {rateLimit, RateLimitRequestHandler} from "express-rate-limit"
import helmet from "helmet"

import { RouteControl } from "./route"

const Controller: exp.Application = exp()
const Port: number = 5000
const staticFileMiddleware = exp.static("./dist")

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
Controller.use(exp.urlencoded({extended: true}))
Controller.use(Helmet)
Controller.use(staticFileMiddleware)
Controller.use(history({
    rewrites: [
        {
          from: /^\/api\/.*$/,
          to: function(context): string {
              return context.parsedUrl.path as string
          }
        }
    ]
}))
Controller.use(staticFileMiddleware)
Controller.use(RateLimiter)

Controller.use("/api", RouteControl)

Controller.listen(Port, "0.0.0.0", () => {
    console.log(`Running on port ${Port}`)
})
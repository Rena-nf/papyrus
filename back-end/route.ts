import { NextFunction, Router, Request, Response, } from "express"
import path from "path"

import { PassportAuth } from "./auth"

const RouteControl: Router = Router()

const checkIfLogged = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).send("User not authorized / Not logged in")
    }
}

RouteControl.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public', './index.html'))
})

RouteControl.post("/login", PassportAuth.authenticate('local', {
    failureRedirect: "/login",
    failureMessage: true,
    successRedirect: "/",
    successMessage: true
}))

RouteControl.post("/register")

export default RouteControl

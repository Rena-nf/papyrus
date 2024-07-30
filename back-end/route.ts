import { Request, Response, Router } from "express"

const RouteControl = Router()

RouteControl.get("/", (req: Request, res: Response) => {
    res.send({
        "success": true,
        "message": "connected",
        "data": {}
    })
})

export {RouteControl}
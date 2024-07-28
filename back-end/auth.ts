import pass from "passport"
import { Strategy } from "passport-local"

import { UserModel } from "./user"

const LocalStrategy: Strategy = new Strategy(UserModel.authenticate())
const PassportAuth: pass.PassportStatic = pass

// Username and password login
PassportAuth.use(LocalStrategy)
PassportAuth.serializeUser(UserModel.serializeUser())
PassportAuth.deserializeUser(UserModel.deserializeUser())

export { PassportAuth }
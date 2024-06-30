import pass from "passport"
import { Strategy } from "passport-local"

import { UserModel } from "./user"

const LocalStrategy: Strategy = new Strategy(UserModel.authenticate())
const Passport: pass.PassportStatic = pass

// Username and password login
Passport.use(LocalStrategy)
Passport.serializeUser(UserModel.serializeUser())
Passport.deserializeUser(UserModel.deserializeUser())

export { Passport }
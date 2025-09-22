import express from 'express'
import{signOut, signUp,signIn} from "../controllers/auth.controllers.js"

const authRouter = express.Router();
authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.post("/signout",signOut)

export default authRouter;
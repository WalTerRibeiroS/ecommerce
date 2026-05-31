import { Router } from "express"
import { loginPOST } from "./controller.js"
import { autentificar } from "../../middlewares/autentiMiddleware.js"

const router = Router()

router.post("/", loginPOST)

export default router
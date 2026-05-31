import { Router } from "express"
import { usuarioPOST } from "./controller.js"

const router = Router()

router.post("/", usuarioPOST)

export default router
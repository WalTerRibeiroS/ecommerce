import { Router } from "express"
import { refreshPOST } from "./controller.js"

const router = Router()

router.post("/", refreshPOST)

export default router
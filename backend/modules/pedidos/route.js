import { Router } from "express"
import { autentificarCookie } from "../../middlewares/autentiMiddleware.js"
import { autorizar } from "../../middlewares/autoriMiddleware.js"

import * as control from "./controller.js"

const router = Router()

router.get("/itens-comprados", autentificarCookie, control.pegarDadosItensCompradosGET)

export default router
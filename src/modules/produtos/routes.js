import { Router } from "express"/* 
import { autentificar } from "../../middlewares/autentiMiddleware.js" */
import { autorizar } from "../../middlewares/autoriMiddleware.js"

import * as control from "./controller.js"

const router = Router()

router.post("/", control.produtosPOST)
router.patch("/:id", control.produtosPATCH)
router.get("/destaque", control.destaqueProdutosGET)

export default router
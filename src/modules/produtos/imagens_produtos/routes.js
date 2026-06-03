import { Router } from "express"/* 
import { autentificar } from "../../../middlewares/autentiMiddleware.js"
import { autorizar } from "../../../middlewares/autoriMiddleware.js" */

import * as control from "./controller.js"

const router = Router()

router.post("/", control.imagemProdutosPOST)
router.patch("/:id", control.imagemProdutosPATCH)
/* router.get("/", control.usuariosGET) */

export default router
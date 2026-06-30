import { Router } from "express"/* 
import { autentificar } from "../../middlewares/autentiMiddleware.js" */
import { autorizar } from "../../middlewares/autoriMiddleware.js"

import * as control from "./controller.js"

const router = Router()

router.post("/", control.produtosPOST)
router.patch("/:id", control.produtosPATCH)
router.get("/destaque", control.destaqueProdutosGET)
router.get("/listagem", control.listagemProdutosGET)
router.get("/pagina/:slug-:id", control.paginaProdutoGET)

export default router
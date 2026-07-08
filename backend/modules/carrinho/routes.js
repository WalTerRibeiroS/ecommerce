import { Router } from "express"
import { autentificarCookie } from "../../middlewares/autentiMiddleware.js"

import * as control from "./controller.js"

const router = Router()

router.post("/adicionar",autentificarCookie, control.carrinhoProdutoPOST)
router.get("/buscar",autentificarCookie, control.infoProdutosCarrinhoGET)
router.delete("/deletar",autentificarCookie, control.deletarProdutoCarrinho)

export default router
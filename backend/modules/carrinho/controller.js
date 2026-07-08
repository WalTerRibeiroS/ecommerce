import { asyncHandler } from "../../utils/asyncHandler.js"
import baseLogger from "../../utils/logger.js"

import * as services from "./services.js"

const logger = baseLogger.child({ layer: "controller" })

export const carrinhoProdutoPOST = asyncHandler(async(req, res) => {
    logger.info("Recebido requisacao para adicionar produto no carrinho")

    const usuario_id = req.usuario.id;
    const { produto_id, quantidade } = req.body;

    const resultado = await services.adicionarProdutoCarrinho(usuario_id, produto_id, quantidade)

    logger.info("Saindo com ", { resultado })
    res.status(201).json({
        message: "Produto adicionado ao carrinho."
    });
})

export const infoProdutosCarrinhoGET = asyncHandler(async(req, res) => {
    logger.info("Recebido requisacao para buscar produtos no carrinho")

    const usuario_id = req.usuario.id;

    const resultado = await services.infoCarrinho(usuario_id)

    res.status(201).json(resultado)
})

export const deletarProdutoCarrinho = asyncHandler(async(req, res) => {
    logger.info("Recebido requisacao para deletar produtos no carrinho")

    const usuario_id = req.usuario.id;
    const { produto_id } = req.body

    const resultado = await services.deletarProdutoCarrinho(usuario_id, produto_id)

    res.status(200).json({
        mensagem: "Produto removido do carrinho com sucesso."
    });
})
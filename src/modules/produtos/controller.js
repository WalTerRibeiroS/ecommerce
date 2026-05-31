import * as services from "../produtos/services.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import baseLogger from "../../utils/logger.js"

const logger = baseLogger.child({ layer: "controller"})

export const produtosPOST = asyncHandler(async(req, res) => {
    logger.info("Recebido request")
    const { nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete } = req.body

    const produtoNovo = await services.createProduto(nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete)

    logger.info("Concluido a request")
    res.status(201).json(produtoNovo)
})

export const produtosPATCH = asyncHandler(async(req, res) => {
    logger.info("Recebido request pra atualizar produto de id:", { produto: req.params.id })

    const { id } = req.params

    const dados = req.body

    const produtoAtualizado = await services.updateProduto(id,dados)

    logger.info("Atualizacao de dados concluido com sucesso, produto:"/* , { produtoAtualizado: req.params.id, req.body.dados} */)
    res.json(produtoAtualizado)
})

export const destaqueProdutosGET = asyncHandler(async(req, res) => {
    logger.info("aqui entrou")
    const produtos = await services.destaqueProdutos()

    logger.info("aqui saiu")
    res.json(produtos)
})
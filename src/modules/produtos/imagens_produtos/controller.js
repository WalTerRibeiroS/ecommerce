import * as services from "./services.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"
import baseLogger from "../../../utils/logger.js"

const logger = baseLogger.child({ layer: "controller"})

export const imagemProdutosPOST = asyncHandler(async(req, res) => {
    logger.info("Recebido request")
    const { id_produto, imagem_path } = req.body

    const imagemNova = await services.postImagemProduto(id_produto, imagem_path)

    logger.info("Concluido a request")
    res.status(201).json(imagemNova)
})

export const imagemProdutosPATCH = asyncHandler(async(req, res) => {
    logger.info("Recebido request pra atualizar produto de id:", { produto: req.params.id })

    const { id } = req.params

    const dados = req.body

    const imagemProdutoAtualizada = await services.patchImagemProduto(id,dados)

    logger.info("Atualizacao de dados concluido com sucesso")
    res.json(imagemProdutoAtualizada)
})
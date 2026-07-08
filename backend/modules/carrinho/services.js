import { AppError } from "../../utils/errors.js"
import baseLogger from "../../utils/logger.js"

import * as model from "./model.js"

const logger = baseLogger.child({ layer: "service" })

export const adicionarProdutoCarrinho = async(usuario_id, produto_id, quantidade) => {
    logger.debug("Entrando com", { usuario_id, produto_id, quantidade })

    const resultado = await model.adicionarProduto(usuario_id, produto_id, quantidade)

    logger.debug("Saindo com ", { resultado })
    return resultado
}

export const infoCarrinho = async(usuario_id) => {
    logger.debug("Entrando com", { usuario_id})

    const resultado = await model.infoProdutosCarrinho(usuario_id)

    return resultado
}

export const deletarProdutoCarrinho = async(usuario_id, produto_id) => {
    logger.debug("Entrando com", { usuario_id, produto_id})

    const resultado = await model.deletarProdutoCarrinho(usuario_id, produto_id)

    logger.debug("saindo", { usuario_id, produto_id})
}

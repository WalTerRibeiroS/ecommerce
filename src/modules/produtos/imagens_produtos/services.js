import { AppError } from "../../../utils/errors.js"
import baseLogger from "../../../utils/logger.js"
import * as model from "./model.js"
import {validationError } from "../../../utils/errors.js" 

const logger = baseLogger.child({ layer: "services" })

export const postImagemProduto = async(id_produto, imagem_path) => {
    logger.debug("Entrando ")

    const errors = [] 

    if (!imagem_path) {
        errors.push({ field: "caminho da imagem", message: "caminho da imagem é obrigatório" })
    }

    if (id_produto === null) {
        errors.push({ field: "id do produto", message: "id do produto é obrigatório" })
    }

    logger.debug("Saindo  ")
    return await model.adicionarImagemProduto(id_produto, imagem_path)
}

export const patchImagemProduto = async(id, dados) => {
    logger.debug("Entrando ")

    const camposPermitidos = ["id_produto", "imagem_path"]

    const campos = []
    const valores = []

    Object.entries(dados).forEach(([chave, valor]) => {
        if (camposPermitidos.includes(chave)) {
            campos.push(`${chave} = $${campos.length + 1}`)
            valores.push(valor)
        }
    })

    if (campos.length === 0){
        throw new Error("Nenhum campo valido foi inserido")
    }

    valores.push(id)

    logger.debug("Saindo  ")
    return await model.atualizarImagensProduto(campos,valores)
}
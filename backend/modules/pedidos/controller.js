import * as services from "./services.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import baseLogger from "../../utils/logger.js"

const logger = baseLogger.child({ layer: "controller"})

export const pegarDadosItensCompradosGET = asyncHandler(async(req, res) => {
    logger.info("solicitacao para pegar dados")

    const idUsuario = req.usuario.id

    const resultado = await services.pegarDadosItensComprados(idUsuario)
    
    logger.info("saindo")
    
    res.json(resultado)
})
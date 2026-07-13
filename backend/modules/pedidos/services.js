import { AppError } from "../../utils/errors.js"
import baseLogger from "../../utils/logger.js"
import * as model from "./model.js"

const logger = baseLogger.child({ layer: "services" })

//logger.debug("Entrando ")
//logger.debug("Saindo  ")

export const pegarDadosItensComprados = async(idUsuario) => {
    logger.debug("Entrando ")

    const resultado = await model.pegarDadosItensComprados(idUsuario) 

    logger.debug("Saindo")
    
    return resultado
}
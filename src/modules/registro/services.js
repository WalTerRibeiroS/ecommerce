import { AppError } from "../../utils/errors.js"
import { registrarUsuario } from "./model.js"
import { getUsuarioPorEmail } from "./model.js"
import { salvarRefreshToken } from "./model.js"
import baseLogger from "../../utils/logger.js"
import { ENV } from "../../config/env.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"

const logger = baseLogger.child({ layer: "service" })

export const usuarioRegistrar = async(nome, sobrenome, email, senha) => {
    logger.debug("Entrando com", { nome, sobrenome, email })

    const emailEmUso = await getUsuarioPorEmail(email)

    if(emailEmUso){
        throw new AppError("Esse email já está em uso", 409)
    }

    const novoRegistro = await registrarUsuario(nome, sobrenome, email, senha)

    const { senha_hash, ...usuarioSeguro } = novoRegistro //separa a senha do usuario final (q é usado durante todo fluxo)

    const accessToken = jwt.sign(
        { id: usuarioSeguro.id, role: usuarioSeguro.role},
        ENV.ACCESS_TOKEN,
        { expiresIn: "15m"}
    )

    const refreshToken = jwt.sign(
        { id: usuarioSeguro.id },
        ENV.REFRESH_TOKEN,
        { expiresIn: "7d"}
    )

    const hash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex")

    await salvarRefreshToken( hash,usuarioSeguro.id)


    logger.debug("saindo com", { nome, sobrenome, email })
    return { usuario: usuarioSeguro, accessToken, refreshToken }
}
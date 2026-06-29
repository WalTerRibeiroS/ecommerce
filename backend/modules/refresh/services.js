import { AppError } from "../../utils/errors.js"
import { ENV } from "../../config/env.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import baseLogger from "../../utils/logger.js"
import { salvarRefreshToken } from "../registro/model.js"
import { buscarRefreshToken } from "./model.js"

const logger = baseLogger.child({ layer: "service"})

export const validarRefreshToken = async(token) => {
    logger.debug("Entrando com o cookie")
    
    if (!token) {
        throw new AppError("Sem refresh token", 401)
    }

    const hash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

    const usuario = await buscarRefreshToken(hash)

    if (!usuario) {
        throw new AppError("Token inválido", 403)
    }

    const decoded = jwt.verify(token, ENV.REFRESH_TOKEN)

    const newAccessToken = jwt.sign(
        { id: decoded.id, role: usuario.role },
        ENV.ACCESS_TOKEN,
        { expiresIn: "15m" }
    )

    const newRefreshToken = jwt.sign(
        { id: usuario.id },
        ENV.REFRESH_TOKEN,
        { expiresIn: "7d"}
    )
    const novoHash = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex")

    await salvarRefreshToken( novoHash,usuario.id) 

    logger.debug("saindo com tokens novos ")
    return { newAccessToken, newRefreshToken }
}
import { AppError } from "../../utils/errors.js"
import { ENV } from "../../config/env.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import baseLogger from "../../utils/logger.js"
import { getUsuarioPorEmail } from "../registro/model.js"
import { salvarRefreshToken } from "../registro/model.js"

const logger = baseLogger.child({ layer: "service"})

export const realizarLogin = async(email, senha) => {
    logger.debug("entrando", { email })

    const usuario = await getUsuarioPorEmail(email)

    if(!usuario){
        throw new AppError("Credenciais invalidadas", 404)
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash) 

    if(!senhaValida){
        throw new AppError("Credenciais invalidadas", 404)
    }   

    const newAccessToken = jwt.sign(
        { id: usuario.id, role: usuario.role },
        ENV.ACCESS_TOKEN,
        { expiresIn: "15m" }
    )

    const newRefreshToken = jwt.sign(
        { id: usuario.id },
        ENV.REFRESH_TOKEN,
        { expiresIn: "7d"}
    )

    const hash = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex")

    await salvarRefreshToken( hash,usuario.id)    

    logger.debug("saindo com", {newAccessToken, newRefreshToken})
    return {newAccessToken, newRefreshToken}
}
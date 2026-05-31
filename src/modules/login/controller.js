import {asyncHandler} from "../../utils/asyncHandler.js"
import baseLogger from "../../utils/logger.js"
import { realizarLogin } from "./services.js"

const logger = baseLogger.child({ layer: "controller"})

export const loginPOST = asyncHandler(async(req, res) => {
    const { email, senha } = req.body

    const { newAccessToken, newRefreshToken } = await realizarLogin(email, senha)

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false, //true em producao
        sameSite: "strict"
    })

    logger.info("Login concluido com sucesso")
    res.json({ newAccessToken, newRefreshToken}) 
})
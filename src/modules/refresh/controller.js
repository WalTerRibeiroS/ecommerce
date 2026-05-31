import {asyncHandler} from "../../utils/asyncHandler.js"
import baseLogger from "../../utils/logger.js"
import { validarRefreshToken } from "./services.js"

const logger = baseLogger.child({ layer: "controller"})

export const refreshPOST = asyncHandler(async(req, res) => {
    logger.info("Entrando com ", {refreshToken: req.cookies.refreshToken})

    const token = req.cookies.refreshToken

    const { newAccessToken, newRefreshToken } = await validarRefreshToken(token)

    logger.info("Saindo com novos tokens")
    res.json({ newAccessToken, newRefreshToken })
})
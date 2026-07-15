import {asyncHandler} from "../../utils/asyncHandler.js"
import baseLogger from "../../utils/logger.js"
import {usuarioRegistrar} from "./services.js"
import { registrarUsuarioSchema } from "../../zodSchemas/registrarUsuario.js"

const logger = baseLogger.child({ layer: "controller" })

export const usuarioPOST = asyncHandler(async(req, res) => {
    logger.info("Recebido requisacao para registrar usuario")

    const { nome, sobrenome, email, senha } = registrarUsuarioSchema.parse(req.body);

    const { usuario, accessToken, refreshToken } = await usuarioRegistrar(nome, sobrenome, email, senha)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, //true em producao, pq?
        sameSite: "none"
    })

    const usuarioCompleto = { ...usuario, refreshToken }

    logger.info("Pessoa registrada com sucesso", { nome, sobrenome, email })
    res.status(201).json({ usuarioCompleto, accessToken })
})
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
        secure: false, //true em producao, pq?
        sameSite: "strict"
    })

    /* const { senha_hash, ...usuarioSeguro } = novoRegistro  <-- rest (pega o resto sem senha_hash*/

    const usuarioCompleto = { ...usuario, refreshToken }  /* spread (joga tudo da variavel + alguma outra coisa, resultado cria um novo objeto) */

    logger.info("Pessoa registrada com sucesso", { nome, sobrenome, email })
    res.status(201).json({ usuarioCompleto, accessToken })
})
import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js"
import {AppError} from "../utils/errors.js"

export const autentificar = (req, res, next) => {
    const autenHeader = req.headers.authorization

    if(!autenHeader){
        throw new AppError("Token nao foi fornecido", 401)
    }

    const [, token] = autenHeader.split(" ")

    if(!token){
        throw new AppError("token invalido", 401)
    }

    try{
        const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET)

        req.usuario = decoded

        next()
    }catch(error){
        throw new AppError("token expirado ou invalido", 403)
    }
}
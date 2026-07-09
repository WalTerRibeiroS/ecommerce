import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js"
import {AppError} from "../utils/errors.js"

export const autentificarCookie = (req, res, next) => {
    
    const token = req.cookies.refreshToken;

    if (!token) {
        throw new AppError("Usuário não foi autentificado, faça login", 401);
    }

    try {
        const decoded = jwt.verify(
            token,
            ENV.REFRESH_TOKEN
        );

        req.usuario = decoded;

        next();
    } catch {
        throw new AppError(
            "token expirado ou invalido",
            403
        );
    }
};
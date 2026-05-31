import { AppError } from "../utils/errors.js"

export const autorizar = (rolePermitido) => {
    return (req, res, next) => {
        if(req.usuario.role !== rolePermitido){
            throw new AppError("Acesso negado", 403)
        }
        next()
    }
}
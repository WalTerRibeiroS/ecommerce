export class AppError extends Error{
    constructor(message, statusCode, options = {}){
        super(message)

        this.statusCode = statusCode
        this.status = String(statusCode).startsWith("4") ? "fail" : "error"

        this.isOperational = true

        this.code = options.code || null
        this.details = options.details || null

        Error.captureStackTrace(this, this.constructor)
    }
}

export const validationError = (details) => {     // descobrir pq meu details n aparece
    return new AppError("Erro de validação", 400, {
        code: "VALIDATION_ERROR",
        details
  })
}
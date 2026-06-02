import { ENV } from "../config/env.js"
import logger from "../utils/logger.js"
import { ZodError } from "zod"

const errorMiddleware = (err, req, res, next) => {

    
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    
    const isDev = ENV.NODE_ENV === "desenvolvimento"
    
    logger.error({
        message: err.message,
        statusCode: err.statusCode,
        status: err.status,
        stack: err.stack,
        details: err.details,
        path: req.originalUrl,
        method: req.method
    })
    
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: "fail",
            errors: err.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }   
    
    if(isDev){
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message || "erro interno do servidor",
            stack: err.stack,
            details: err.details
        })
    }

    if(err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message
        })
    }

    return res.status(500).json({
        success: false,
        status: "error",
        message: "erro interno do servidor"
    })
}

export default errorMiddleware
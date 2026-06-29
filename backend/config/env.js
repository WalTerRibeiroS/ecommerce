import dotenv from "dotenv"

dotenv.config()

function processar(envValidacao, nome){
    if(!envValidacao){
        throw new Error(`Essa variavel de elemento n existe: ${nome}`)
    }
    return envValidacao
}

export const ENV = {
    PORT: processar(process.env.PORT, "PORT"),
    NODE_ENV: processar(process.env.NODE_ENV, "NODE_ENV"),
    FRONTEND_URL: processar(process.env.FRONTEND_URL, "FRONTEND_URL"),
    BACKEND_URL: processar(process.env.BACKEND_URL, "BACKEND_URL"),

    DB_USER: processar(process.env.DB_USER, "DB_USER"),
    DB_HOST: processar(process.env.DB_HOST, "DB_HOST"),
    DB_NAME: processar(process.env.DB_NAME, "DB_NAME"),
    DB_PASSWORD: processar(process.env.DB_PASSWORD, "DB_PASSWORD"),
    DB_PORT: Number(process.env.DB_PORT),

    ACCESS_TOKEN: processar(process.env.ACCESS_TOKEN, "ACCESS_TOKEN"), 
    REFRESH_TOKEN: processar(process.env.REFRESH_TOKEN, "REFRESH_TOKEN"),

    LOG_LEVEL: processar(process.env.LOG_LEVEL, "LOG_LEVEL")
}
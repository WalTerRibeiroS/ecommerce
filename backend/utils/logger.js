import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
import { ENV } from "../config/env.js"

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const logger = winston.createLogger({
    levels: logLevels,
    level: ENV.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.errors({stack: true}),
        winston.format.timestamp({
            format: "DD-MM-YYYY HH:mm:ss",
        }),
        winston.format.printf(
            ({timestamp, level, message, ...meta }) => {
                return `${timestamp} ${level}: ${message} ${
                    Object.keys(meta).length ? JSON.stringify(meta) : ""
                }`
            },
        ),
    ),
    transports: [new winston.transports.Console()],
});

const fileRotateTransport = new DailyRotateFile({
    filename: "logs/aplicacao-%DATE%.log",
    datePattern: "DD-MM-YYYY",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: winston.format.combine(
        winston.format.errors({ stack: true}),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    )
});

logger.add(fileRotateTransport);

export default logger
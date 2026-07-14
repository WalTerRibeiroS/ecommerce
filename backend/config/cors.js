/* import { ENV } from "./env.js"

const allowedOrigins = ENV.NODE_ENV === "producao"
    ? [ENV.FRONTEND_FINALIZADA_URL]
    : [
        ENV.BACKEND_URL,
        ENV.FRONTEND_URL,
        "http://localhost:5500", 
        "http://127.0.0.1:5500",
        "http://localhost:3000"
    ]

export const corsOrigins = {
    origin: (origin, callback) => {
        if (!origin) return callback (null, true);

        if (allowedOrigins.includes(origin)){
            callback(null, true);
        } else{
            callback(new Error("Bloqueado pelo CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}; */

import { ENV } from "./env.js"

export const corsOrigins = {
    origin: (origin, callback) => {
        // MODO DEBUG TEMPORÁRIO: Aceita absolutamente qualquer origem
        callback(null, true); 
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
};
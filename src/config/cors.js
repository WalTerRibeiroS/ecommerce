import { ENV } from "./env.js"

const allowedOrigins = ENV.NODE_ENV === "producao"
    ? [ENV.FRONTEND_FINALIZADA_URL]
    : [
        ENV.BACKEND_URL,
        ENV.FRONTEND_URL
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
};
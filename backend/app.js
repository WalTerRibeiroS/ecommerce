import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"

//------- importantes -----
import { corsOrigins } from "./config/cors.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import morganMiddleware from "./middlewares/morgan.js"

//-------rotas -----------
import registrarRoute from "./modules/registro/router.js"
import loginRoute from "./modules/login/routes.js"
import refreshRoute from "./modules/refresh/router.js"
import produtosRoute from "./modules/produtos/routes.js"
import imagensProdutosRoute from "./modules/produtos/imagens_produtos/routes.js"
import authVerificacaoRoute from "./modules/authVerificacao/route.js"
import logoutRoute from "./modules/logout/route.js"

//------código ----------

const app = express();

app .use(express.json())
    .use("/uploads", express.static("uploads"))
    .use(cors(corsOrigins))
    .use(helmet())
    .use(cookieParser())
    .use(morganMiddleware)

    .use("/api/v1/auth/registrar", registrarRoute)
    .use("/api/v1/auth/login", loginRoute)
    .use("/api/v1/auth/refresh", refreshRoute)
    .use("/api/v1/auth/status", authVerificacaoRoute)
    .use("/api/v1/auth/logout", logoutRoute)
    .use("/api/v1/produtos", produtosRoute)
    .use("/api/v1/imagens-produtos", imagensProdutosRoute)

    .use(errorMiddleware)

export default app;
    
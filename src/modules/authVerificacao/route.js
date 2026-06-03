import { Router } from "express";

import { validarCookie } from "./controller.js"
import { autentificarCookie } from "../../middlewares/autentiMiddleware.js"

const router = Router();

router.get("/", autentificarCookie, validarCookie);

export default router;
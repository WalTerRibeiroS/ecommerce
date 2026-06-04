import { Router } from "express";

import { logout } from "./controller.js"

const router = Router();

router.post("/", logout);

export default router;
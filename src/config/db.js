import pkg from "pg"
const { Pool } = pkg

import { ENV } from "./env.js"

const pool = new Pool({
    user: ENV.DB_USER,
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    password: ENV.DB_PASSWORD,
    port: ENV.DB_PORT,
});

export default pool
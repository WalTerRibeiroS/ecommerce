import pool from "../../config/db.js"

export const buscarRefreshToken = async (refresh_token) => {
    const result = await pool.query(
        "SELECT * FROM usuarios WHERE refresh_token=$1",
        [refresh_token]
    )
    return result.rows[0]
}
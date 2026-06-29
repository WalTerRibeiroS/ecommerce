import pool from "../../config/db.js"
import bcrypt from "bcrypt"

export const registrarUsuario = async(nome, sobrenome, email, senha) => {
    const senha_hash = await bcrypt.hash(senha, 10)

    const result = await pool.query(
        "INSERT INTO usuarios (nome, sobrenome, email, senha_hash) VALUES ($1, $2, $3, $4) RETURNING *",
        [nome, sobrenome, email, senha_hash]
    )
    return result.rows[0]
}

export const salvarRefreshToken = async(refresh_token, id) => {
    await pool.query(
        "UPDATE usuarios SET refresh_token=$1, updated_at = NOW() WHERE id=$2 RETURNING *",
        [refresh_token, id]
    )
}


// -------- funcao auxiliar -------------

export const getUsuarioPorEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM usuarios WHERE email=$1",
        [email]
    )
    return result.rows[0]
}
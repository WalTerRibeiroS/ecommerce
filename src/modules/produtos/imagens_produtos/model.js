import pool from "../../../config/db.js"

export const adicionarImagemProduto = async(id_produto, imagem_path) => {
    const result = await pool.query(
        "INSERT INTO imagens_produtos (id_produto, imagem_path) VALUES ($1, $2) RETURNING *",
        [id_produto, imagem_path]
    )
    return result.rows[0]
}

export const atualizarImagensProduto = async (campos,valores) => {
    const query = `UPDATE imagens_produtos SET ${campos.join(", ")} WHERE id = $${valores.length} RETURNING *`

    const result = await pool.query(query, valores)

    return result.rows[0]
}
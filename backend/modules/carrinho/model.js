import pool from "../../config/db.js";

export const adicionarProduto = async (usuario_id, produto_id, quantidade) => {
    const result = await pool.query(
        `INSERT INTO carrinho_items (usuario_id, produto_id, quantidade)
            VALUES ($1, $2, $3)

            ON CONFLICT (usuario_id, produto_id)
            DO UPDATE
            SET
                quantidade = carrinho_items.quantidade + 1,
                updated_at = NOW();`,

        [usuario_id, produto_id, quantidade]
    )
    return result.rows[0]
}

export const infoProdutosCarrinho = async (usuario_id) => {

    const result = await pool.query(
        `SELECT
            p.id,
            p.nome,
            p.preco,
            p.desconto_percentual,
            p.frete,
            p.quantidade_disponivel,
            p.slug,
            ci.quantidade,
            (
                SELECT i.imagem_path
                FROM imagens_produtos i
                WHERE i.id_produto = p.id
                ORDER BY i.id
                LIMIT 1
            ) AS imagem_path
        FROM carrinho_items ci
        JOIN produtos p
            ON p.id = ci.produto_id
        WHERE ci.usuario_id = $1
        ORDER BY ci.created_at DESC;
        `,

        [usuario_id]
    )
    return result.rows
}

export const deletarProdutoCarrinho = async (usuario_id, produto_id) => {
    const result = await pool.query(
        `
        DELETE FROM carrinho_items
        WHERE usuario_id = $1
          AND produto_id = $2
        `,
        [usuario_id, produto_id]
    );

    return result;
}

export const deletarProdutosCarrinho = async (client, idsBuscar, idUsuario) => {
    const result = await client.query(
        `
        DELETE FROM carrinho_items
        WHERE usuario_id = $1
          AND produto_id = ANY($2)
        `,
        [idUsuario, idsBuscar]
    );

    return result;
}
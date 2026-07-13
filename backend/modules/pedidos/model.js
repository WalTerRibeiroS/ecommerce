import pool from "../../config/db.js"

export const criarPedido = async (client, idUsuario, totalBruto, totalFrete, totalDescontado, total) => {
    
    const result = await client.query(
        "INSERT INTO pedidos (id_usuario, subtotal, frete, desconto, total) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [idUsuario, totalBruto, totalFrete, totalDescontado, total] 
    )

    return result.rows[0].id
}

export const registrarItemsPedido = async (client, idPedido, idsBuscar, quantidades, precos, nomes) => {
    const idsPedidoArray = new Array(idsBuscar.length).fill(idPedido);

    const result = await client.query(
        `INSERT INTO pedido_items (id_pedido, id_produto, quantidade, preco_unitario, nome_produto)
        SELECT * FROM UNNEST($1::int[], $2::int[], $3::int[], $4::numeric[], $5::text[])`,

        [idsPedidoArray, idsBuscar, quantidades, precos, nomes]
    )
}

export const pegarDadosItensComprados = async (idUsuario) => {

    const result = await pool.query(
        `
        SELECT COALESCE(
            json_agg(
                json_build_object(
                    'id_pedido', pedidos.id,
                    'status', pedidos.status,
                    'data', pedidos.created_at,
                    'produtos', pedidos.produtos
                )
                ORDER BY pedidos.created_at DESC
            ),
            '[]'::json
        ) AS compras

        FROM (

            SELECT
                p.id,
                p.status,
                p.created_at,

                json_agg(
                    json_build_object(
                        'id_produto', pr.id,
                        'slug', pr.slug,
                        'nome', pi.nome_produto,
                        'imagem', img.imagem_path
                    )
                ) AS produtos

            FROM pedidos p

            INNER JOIN pedido_items pi
                ON pi.id_pedido = p.id

            INNER JOIN produtos pr
                ON pr.id = pi.id_produto

            LEFT JOIN LATERAL (
                SELECT imagem_path
                FROM imagens_produtos
                WHERE id_produto = pr.id
                ORDER BY id
                LIMIT 1
            ) img ON true

            WHERE p.id_usuario = $1

            GROUP BY
                p.id,
                p.status,
                p.created_at

        ) pedidos;
        `,
        [idUsuario]
    );

    return result.rows[0].compras;
};
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
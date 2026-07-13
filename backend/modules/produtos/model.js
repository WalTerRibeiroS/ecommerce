import pool from "../../config/db.js"

export const produtoTodos = async() => {
    const result = await pool.query(
        "SELECT * FROM usuarios"
    )
    return result.rows
}

export const produtoPorId = async(id) => {
    const result = await pool.query(
        "SELECT * FROM usuarios WHERE id=$1",
        [id]
    )
    return result.rows[0]
}

export const criarProduto = async(nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete) => {
    const result = await pool.query(
        "INSERT INTO produtos (nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete]
    )
    return result.rows[0]
}

export const atualizarProduto = async (campos,valores) => {

    const query = `UPDATE produtos SET ${campos.join(", ")}, updated_at = NOW() WHERE id = $${valores.length} RETURNING *`// .join transforma um array em string, + adiciona um separador, nesse caso ","

    //id em valores.length pq o id é sempre o ultimo ent funfa por isso $n 

    const result = await pool.query(query, valores)//pega a query montada com os $ certinho e substitui pelos valores do array de valores

    return result.rows[0]
}

export const produtosDestaque = async () => {
    const sql = `
        SELECT
            p.id,
            p.nome,
            p.preco,
            p.desconto_percentual,
            p.frete,
            p.slug,
            (
                SELECT i.imagem_path
                FROM imagens_produtos i
                WHERE i.id_produto = p.id
                ORDER BY i.id
                LIMIT 1
            ) AS imagem_path
        FROM produtos p
        ORDER BY RANDOM()
        LIMIT 9
    `;

    const result = await pool.query(sql)

    return result.rows
}

export const produtosListagem = async (ordenar = "az", limite, busca, pagina, preco_min, preco_max) => {
    
    let orderBy = "p.nome ASC";

    switch (ordenar) {
        case "maior_preco":
            orderBy = "p.preco DESC";
            break;

        case "menor_preco":
            orderBy = "p.preco ASC";
            break;

        default:
            orderBy = "p.nome ASC";
    }

    const offset = (pagina - 1) * limite

    const totalResult = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM produtos p
        WHERE 
            p.nome ILIKE $1
        AND
            p.preco BETWEEN $2 AND $3
        `,
        [
            `%${busca || ""}%`,
            preco_min || 1,
            preco_max || 4000
        ]
    );
    
    const sql = `
        SELECT 
            p.id,
            p.nome,
            p.preco,
            p.desconto_percentual,
            p.frete,
            p.slug,
            (
                SELECT i.imagem_path
                FROM imagens_produtos i
                WHERE i.id_produto = p.id
                ORDER BY i.id
                LIMIT 1
            ) AS imagem_path
        FROM produtos p
        WHERE 
            p.nome ILIKE $1
        AND
            p.preco BETWEEN $2 AND $3

        ORDER BY ${orderBy}
        LIMIT $4 OFFSET $5
    `;

    const produtosResult = await pool.query(sql, 
        [
            `%${busca || ""}%`,
            preco_min || 1,
            preco_max || 4000,
            limite || 20,
            offset || 0
        ]
    );
    
    return {
        produtos: produtosResult.rows,
        total: Number(totalResult.rows[0].total)
    }
}

export const infoProduto = async (id) => {
    const result = await pool.query(
        `SELECT
            p.id,
            p.nome,
            p.preco,
            p.desconto_percentual,
            p.frete,
            p.descricao,
            p.quantidade_disponivel,
            ARRAY_AGG(i.imagem_path ORDER BY i.id) AS imagens
        FROM produtos p

        LEFT JOIN imagens_produtos i
            ON i.id_produto = p.id

        WHERE p.id = $1

        GROUP BY
            p.id,
            p.nome,
            p.preco,
            p.desconto_percentual,
            p.frete,
            p.descricao,
            p.quantidade_disponivel;`,

        [id]
    )

    return result.rows[0]
}

export const sugestaoProdutoPesquisa = async (busca) => {
    
    const result = await pool.query(
        `SELECT ARRAY_AGG(nome) AS sugestoes 
        FROM (
            SELECT nome 
            FROM produtos 
            WHERE nome ILIKE $1 
            LIMIT 4
        ) AS sub`, 
        [`${busca}%`]
    );

    return result.rows[0]?.sugestoes || [];
}

export const pegarValoresProdutos = async (idsBuscar) => {
    
    const result = await pool.query(
        `SELECT json_agg(
            json_build_object(
                'id', p.id,
                'preco', p.preco,
                'desconto_percentual', p.desconto_percentual,
                'frete', p.frete
            )
        ) AS produtos
        FROM produtos p
        WHERE p.id = ANY($1)`,

        [idsBuscar]
    );

    return result.rows[0]?.produtos || [];
}

export const pegarDadosProdutos = async (client, idsBuscar) => {
    
    const result = await client.query(
        `SELECT json_agg(
            json_build_object(
                'id', p.id,
                'preco', p.preco,
                'nome', p.nome
            )
        ) AS produtos
        FROM produtos p
        WHERE p.id = ANY($1)`,

        [idsBuscar]
    );

    return result.rows[0]?.produtos || [];
}

export const reduzirEstoque = async (client, idsBuscar, quantidades) => {

    const result = await client.query(
        `
        UPDATE produtos p

        SET quantidade_disponivel = p.quantidade_disponivel - dados.quantidade

        FROM (
            SELECT *
            FROM UNNEST(
                $1::int[],
                $2::int[]
            ) AS dados(id_produto, quantidade)
        ) dados

        WHERE p.id = dados.id_produto
        AND p.quantidade_disponivel >= dados.quantidade;
        `,
        [idsBuscar, quantidades]
    );

    return result.rowCount
}
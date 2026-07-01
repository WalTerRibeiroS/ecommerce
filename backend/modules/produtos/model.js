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

export const produtosListagem = async (ordenar = "az", limite, pagina, preco_min, preco_max) => {

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
        WHERE p.preco BETWEEN $1 AND $2
        `,
        [preco_min || 1, preco_max || 4000]
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
        WHERE p.preco BETWEEN $1 AND $2
        ORDER BY ${orderBy}
        LIMIT $3 OFFSET $4
    `;

    const produtosResult = await pool.query(sql, 
        [
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

/* export const atualizarTodoOProduto = async(id, nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete) => {
        const result = await pool.query(
        "UPDATE produtos SET nome = $1,descricao = $2,preco = $3,desconto_percentual = $4,quantidade_disponivel = $5,slug = $6,frete = $7, updated_at = NOW() WHERE id = $8 RETURNING *",
        [nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete, id]
    )
    return result.rows[0]
}

export const deletarProduto = async(id) => {
    const result = await pool.query(
        "DELETE FROM produtos WHERE id = $1 RETURNING id",
        [id]
    )
    return result.rows[0]
} */


/* export const getProdutoPorNomeOuSlug = async (nome, slug) => {
    const result = await pool.query(
        "SELECT * FROM produtos WHERE nome=$1 OR slug=$2",
        [nome, slug]
    )
    return result.rows[0]
} */
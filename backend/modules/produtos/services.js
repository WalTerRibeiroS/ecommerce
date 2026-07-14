import pool from "../../config/db.js"
import { AppError } from "../../utils/errors.js"
import baseLogger from "../../utils/logger.js"
import * as model from "./model.js"
import { criarPedido, registrarItemsPedido } from "../pedidos/model.js"
import { deletarProdutosCarrinho } from "../carrinho/model.js"
import {validationError } from "../../utils/errors.js" 
import { formatarNumeroQuebrado } from "../../utils/formatarNumeroQuebrado.js"

const logger = baseLogger.child({ layer: "services" })
//logger.debug("Entrando ")
//logger.debug("Saindo  ")


export const createProduto = async(nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete) => {
    logger.debug("Entrando ")

    const errors = [] 

    /*  const produtoExistente = await model.getProdutoPorNomeOuSlug(nome, slug)

    const { nome: nomeExistente, slug: slugExistente } = produtoExistente

    if(nome === nomeExistente){
        errors.push({ field: "nome", message: "esta nome ja pertence a outro produto" })
    }
    
    if(slug === slugExistente){
        errors.push({ field: "slug", message: "esta slug ja pertence a outro produto" })
    } */

    desconto_percentual = desconto_percentual ?? 0
    quantidade_disponivel = quantidade_disponivel ?? 0
    frete = frete ?? 0

    if (!nome) {
        errors.push({ field: "nome", message: "Nome é obrigatório" })
    }

    if (!descricao) {
        errors.push({ field: "descricao", message: "descricao é obrigatório" })
    }

    if (preco == null) { //compara com null pq se eu colocar if no preco se colocar 0 no preco entra no erro
        errors.push({ field: "preco", message: "preco é obrigatório" })
    }

    if (!slug) {
        errors.push({ field: "slug", message: "slug é obrigatório" })
    }

    if (errors.length > 0) {
        throw validationError(errors)
    }

    logger.debug("Saindo  ")
    return await model.criarProduto(nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete)
}

//---- put

export const updateProduto = async (id, dados) => {  //parametros recebidos do frontend
    logger.debug("Entrando ")

    const camposPermitidos = ["nome","descricao","preco","desconto_percentual","quantidade_disponivel","slug","frete"] //whitelist

    const campos = []
    const valores = []

    Object.entries(dados).forEach(([chave, valor]) => {  //Object.entries() transforma o objeto em um array de dois contendo esse formato [key, value], permitindo usar o metodo forEach pra percorrer cada item do array

        if (camposPermitidos.includes(chave)) {

            campos.push(`${chave} = $${campos.length + 1}`) //transforma em parâmetros posicionais de SQL ex nome = $0 (pq n tem nada) + 1 
            // resultado: "nome = $1"
            // campos = ["nome = $1"]
            valores.push(valor) //entra o valor real do dado no array
            // valores = ["Mouse"]
        }
    })

    if (campos.length === 0) { //nao tem como atualizar sem os campos
        throw new Error("Nenhum campo valido enviado foi inserido")
    }

    valores.push(id) //manda o id junto com valores, resultado:
    // valores = [
                //"Mouse",
                //1
   //]

   logger.debug("Saindo  ")
    return await model.atualizarProduto(campos,valores) //chama a funcao que conversa com banco de dados, e ja retorna o resultado pra fora
}

export const destaqueProdutos = async () => {
    
    const produtos = await model.produtosDestaque()

    return produtos
}

export const listagemProdutos = async (ordenar, limite, busca, pagina, preco_min, preco_max) => {
    /* logger.debug("entrando") */
    
    const resultado = await model.produtosListagem(ordenar, limite, busca, pagina, preco_min, preco_max)
    
    return resultado
}

export const produtosInfo = async (id) => {
    /* logger.debug("entrando") */
    
    const resultado = await model.infoProduto(id)
    
    return resultado
}

export const sugestaoPesquisa = async (busca) => {
    /* logger.debug("entrando") */
    
    if(!busca || busca.trim(busca) === ""){
        logger.debug("Busca veio vazio, retornou vazia heehhee")
        return []
    }

    const resultado = await model.sugestaoProdutoPesquisa(busca)
    
    return resultado
}

export const pegarValores = async (idsBuscar, produtos) => {
    logger.debug("entrando")
    
    const resultado = await model.pegarValoresProdutos(idsBuscar)
    
    //ordenar produtos
    const produtosOrdenado = produtos.sort((a, b) => a.id - b.id)
    const quantidades = produtosOrdenado.map(p => p.quantidade)

    //totalBrutoSemDesconto
    const precos = resultado.map(p => p.preco)

    const precosCerto = precos.map((valor, index) => valor * quantidades[index])
    const totalBruto = precosCerto.reduce((acc, cur) => acc + cur, 0);

    //totalEnvio
    const fretes = resultado.map(p => p.frete)
    const totalFrete = fretes.reduce((acc, cur) => acc + cur, 0);

    //totalDescontado
    const descontos = resultado.map(p => p.desconto_percentual)
    const precosPosDescontos = precos.map((valor, index) => valor * (1 - descontos[index] / 100))//(1 - descontoPercentual / 100)
    const precosPorDescontosCerto = precosPosDescontos.map((valor, index) => valor * quantidades[index])

    const diferença = precosCerto.map((valor, index) => valor - precosPorDescontosCerto[index])
    const totalDescontado = diferença.reduce((acc, cur) => acc + cur, 0)
    
    //total
    const total = totalBruto + totalFrete - totalDescontado

    return {
        totalBrutoSemDesconto: totalBruto,
        totalEnvio: totalFrete,
        totalDescontado: totalDescontado,
        total: total
    }
}

export const gravarValores = async (idUsuario, produtos) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const produtosOrdenado = produtos.sort((a, b) => a.id - b.id);

        const produtosObjeto = produtosOrdenado.reduce((acc, item) => {
            acc[item.id] = item.quantidade;
            return acc;
        }, {});

        const idsBuscar = Object.keys(produtosObjeto);
        const quantidades = produtosOrdenado.map(p => p.quantidade);

        const resultado = await model.reduzirEstoque(client, idsBuscar, quantidades);

        if (resultado !== idsBuscar.length) {
            throw new AppError(404, "Estoque insuficiente.");
        }

        const {
            totalBrutoSemDesconto,
            totalEnvio,
            totalDescontado,
            total
        } = await pegarValores(idsBuscar, produtos);

        const totalBrutoFormatado = formatarNumeroQuebrado(totalBrutoSemDesconto);
        const totalFreteFormatado = formatarNumeroQuebrado(totalEnvio);
        const totalDescontadoFormatado = formatarNumeroQuebrado(totalDescontado);
        const totalFormatado = formatarNumeroQuebrado(total);

        const idPedido = await criarPedido(client, idUsuario, totalBrutoFormatado, totalFreteFormatado, totalDescontadoFormatado, totalFormatado);

        const dados = await model.pegarDadosProdutos(client, idsBuscar);

        const precos = dados.map(d => d.preco);
        const nomes = dados.map(d => d.nome);

        await registrarItemsPedido(client, idPedido, idsBuscar, quantidades, precos, nomes);

        await deletarProdutosCarrinho(client, idsBuscar, idUsuario);

        await client.query("COMMIT");

        return {
            idPedido,
            total: totalFormatado,
            status: "sucesso"
        };

    } catch (err) {

        await client.query("ROLLBACK");
        throw err;

    } finally {
        client.release();
    }
}
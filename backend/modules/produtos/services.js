import { AppError } from "../../utils/errors.js"
import baseLogger from "../../utils/logger.js"
import * as model from "./model.js"
import {validationError } from "../../utils/errors.js" 

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

export const listagemProdutos = async (ordenar, limite, pagina, preco_min, preco_max) => {
    logger.debug("entrando")
    
    const resultado = await model.produtosListagem(ordenar, limite, pagina, preco_min, preco_max)
    
    return resultado
}
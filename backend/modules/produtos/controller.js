import * as services from "../produtos/services.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import baseLogger from "../../utils/logger.js"

const logger = baseLogger.child({ layer: "controller"})

export const produtosPOST = asyncHandler(async(req, res) => {
    logger.info("Recebido request")
    const { nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete } = req.body

    const produtoNovo = await services.createProduto(nome, descricao, preco, desconto_percentual, quantidade_disponivel, slug, frete)

    logger.info("Concluido a request")
    res.status(201).json(produtoNovo)
})

export const produtosPATCH = asyncHandler(async(req, res) => {
    logger.info("Recebido request pra atualizar produto de id:", { produto: req.params.id })

    const { id } = req.params

    const dados = req.body

    const produtoAtualizado = await services.updateProduto(id,dados)

    logger.info("Atualizacao de dados concluido com sucesso, produto:"/* , { produtoAtualizado: req.params.id, req.body.dados} */)
    res.json(produtoAtualizado)
})

export const destaqueProdutosGET = asyncHandler(async(req, res) => {
    
    const produtos = await services.destaqueProdutos()

    res.json(produtos)
})

export const listagemProdutosGET = asyncHandler(async(req, res) => {
    /* logger.info("solicitacao") */

    const { ordenar, limite, busca, pagina, preco_min, preco_max } = req.query; 
    
    const resultado = await services.listagemProdutos(ordenar, limite, busca, pagina, preco_min, preco_max)
    
    /* logger.info("saindo") */
    res.json(resultado)
})

export const paginaProdutoGET = asyncHandler(async(req, res) => {
    /* logger.info("solicitacao") */

    const { id } = req.params

    const infoProduto =  await services.produtosInfo(id)

    res.json(infoProduto)
})

export const sugestaoPesquisaGET = asyncHandler(async(req, res) => {
    /* logger.info("solicitacao de pesquisa") */

    const {busca} = req.query

    const resultado = await services.sugestaoPesquisa(busca)

    res.json(resultado)
})

export const pegarValoresGET = asyncHandler(async(req, res) => {
    logger.info("solicitacao de pesquisa de busca de valores")

    const produtos = req.body

    const produtosObjeto = produtos.reduce((acc, item) => {
        acc[item.id] = item.quantidade;
        return acc
    }, {})

    const idsBuscar = Object.keys(produtosObjeto)

    const resultado = await services.pegarValores(idsBuscar, produtos)

    res.json(resultado)
})

export const gravarValoresPOST = asyncHandler(async(req, res) => {
    logger.info("solicitacao para gravar valores")

    const idUsuario = req.usuario.id
    const produtos = req.body

    const resultado = await services.gravarValores(idUsuario, produtos)
    
    logger.info("saindo")
    
    res.status(201).json({
        mensagem: "Pedido realizado com sucesso!",
        dados: resultado
    })
})
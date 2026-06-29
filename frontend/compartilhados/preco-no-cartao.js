export function gerarPrecoNoCartao(preco, quantidadeDeParcelas){
    const precoNoCartao = preco / quantidadeDeParcelas

    return precoNoCartao.toFixed(2).replace('.', ',')
}
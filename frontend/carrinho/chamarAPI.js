export async function chamarAPI() {

    const response = await fetch("https://ecommerce-meu.up.railway.app/api/v1/carrinho/buscar", {
        credentials: "include",
    })

    const carrinhoInfo = await response.json();
    
    return carrinhoInfo
}
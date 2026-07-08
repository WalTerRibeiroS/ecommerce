export async function chamarAPI() {

    const response = await fetch("http://localhost:3000/api/v1/carrinho/buscar", {
        credentials: "include",
    })

    const carrinhoInfo = await response.json();
    
    return carrinhoInfo
}
export async function pegarDadosComprados(dados){
    
    const response = await fetch("http://localhost:3000/api/v1/produtos/valores", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    }); 
    
    const result = await response.json();
    return result
}

export async function realizarCompra(produtos) {
    console.log(produtos)
    
    const response = await fetch("http://localhost:3000/api/v1/produtos/gravar", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produtos)
    }); 
    
    const result = await response.json();

    console.log(result)
    return result
}
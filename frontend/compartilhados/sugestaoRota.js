export async function chamarSugestoesAPI(valor){

    const busca = valor

    const response = await fetch(`http://localhost:3000/api/v1/produtos/sugestao?busca=${busca}`)

    const data = await response.json()
    console.log(data)

    return data
}
export async function chamarSugestoesAPI(valor){

    const busca = valor

    const response = await fetch(`http://localhost:3000/api/v1/produtos/sugestao?busca=${busca}`)

    const data = await response.json()
    console.log(data)

    return data
}

let timeout;

export function buscarSugestoes(inputBusca){

    clearTimeout(timeout)
    
    timeout = setTimeout(async () => {
        const valor = inputBusca

        if (!valor || valor.trim() === "") {
            dropdown.textContent = "";
            
            return;
        }

        const sugestoes = await chamarSugestoesAPI(valor)
        dropdown.textContent = ""
    
        renderizarSugestoes(sugestoes)

    }, 300);
}

function renderizarSugestoes(sugestoes){

    sugestoes.forEach(sugestao => {
        
        const li = document.createElement("li")
        const icon = document.createElement("i")

        icon.classList.add("fa-solid", "fa-magnifying-glass");

        li.append(icon)

        const texto = document.createTextNode(`${sugestao}`)

        li.append(texto)

        dropdown.appendChild(li)
    })
}
export function criarZoomIn() {
    const imagemPrincipal = document.getElementById("imagem-principal")
    const containerImagem = document.getElementById("container-imagem-principal");
    const lens = document.getElementById("lens");
    const result = document.getElementById("result");

    containerImagem.addEventListener("mousemove", (e) => {
        zoomImage(e)
        lens.classList.add("ativado")
        result.classList.add("ativado")
    })

    containerImagem.addEventListener("mouseleave", () => {
        lens.classList.remove("ativado")
        result.classList.remove("ativado")
    }) 

    function zoomImage(e) {
        const {x, y} = getMousePosition(e)
        
        const lensRect = lens.getBoundingClientRect();
        const resultRect = result.getBoundingClientRect();
        const imagemPrincipalRect = imagemPrincipal.getBoundingClientRect();

        lens.style.left = x + "px"
        lens.style.top = y + "px"

        let fx = resultRect.width / lensRect.width
        let fy = resultRect.height / lensRect.height

        result.style.backgroundSize = `${imagemPrincipalRect.width * fx}px ${imagemPrincipalRect.height * fy}px`
        result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`
        result.style.backgroundImage = `url(${imagemPrincipal.src})`
    }

    function getMousePosition(e) {

        const containerRect = containerImagem.getBoundingClientRect();
        const lensRect = lens.getBoundingClientRect();

        let x = e.clientX - containerRect.left - lensRect.width / 2;
        let y = e.clientY - containerRect.top - lensRect.height / 2;
        
        let minX = 0;
        let minY = 0;
        let maxX = containerRect.width - lensRect.width;
        let maxY = containerRect.height - lensRect.height;
        
        if(x <= minX){
            x = minX
        } else if (x >= maxX) {
            x = maxX
        }
        
        if(y <= minY){
            y = minY
        } else if (y >= maxY) {
            y = maxY
        }

        return {x, y}
    }
}
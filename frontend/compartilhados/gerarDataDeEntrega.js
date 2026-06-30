export function gerarDataDeEntrega() {
    const dataMinima = new Date();
    const dataMaxima = new Date();

    dataMinima.setDate(dataMinima.getDate() + 2);
    dataMaxima.setDate(dataMaxima.getDate() + 4);

    const formatador = { day: '2-digit', month: '2-digit' };
  
    const entregaMin = dataMinima.toLocaleDateString('pt-BR', formatador);
    const entregaMax = dataMaxima.toLocaleDateString('pt-BR', formatador);
    
    return `Chegará entre dia ${entregaMin} e ${entregaMax}`;
}

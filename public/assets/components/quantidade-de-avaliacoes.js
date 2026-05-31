export function gerarQuantidadeDeAvalicoes(){

    const max = 567;
    const min = 29;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
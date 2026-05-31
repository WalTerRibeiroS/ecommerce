export function gerarStarRating(){

    const max = 50;
    const min = 37;

    return (Math.floor(Math.random() * (max - min + 1)) + min ) / 10;
}
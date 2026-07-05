export function semAcentos(termo) {
    return termo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
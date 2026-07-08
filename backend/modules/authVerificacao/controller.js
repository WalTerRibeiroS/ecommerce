export const validarCookie = async (req, res) => {
    const usuarioId = req.usuario.id;

    res.status(200).json({ logado: true });
};
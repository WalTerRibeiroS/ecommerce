export const logout = (req, res) => {
    res.clearCookie("refreshToken");

    res.status(200).json({
        success: true,
        message: "Logout realizado com sucesso."
    });
};
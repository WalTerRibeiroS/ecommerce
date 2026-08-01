export const logout = (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    });

    res.status(200).json({
        success: true,
        message: "Logout realizado com sucesso."
    });
};
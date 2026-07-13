const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    res.status(statusCode).json({
        success: true,
        token,
        data: {
            user
        }
    });
};

module.exports = sendToken;
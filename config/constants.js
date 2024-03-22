let { JWT_SECRET, JWT_EXPIRE, SERVER_PORT } = process.env;
module.exports = {
    baseUrl: `http://localhost:${SERVER_PORT}`,
    siteName: 'InterView Project',
    jwt_secret: JWT_SECRET,
    jwt_expire: JWT_EXPIRE
};
const User = require("../models/User");
const getTokenFromHeaders = require("../utils/getTokenFromHeaders");
const verifyToken = require("../utils/verifyToken");

const isLogin = async(req, res, next) => {
    // 1. Recuperer le token depuis les headers (authorization)
    const token = getTokenFromHeaders(req);
    //2. Verifier et decoder le token
    const decodedUser = verifyToken(token);
    // 3. Enregistrer les donnees (id) de l'utilisateur dans la requete
    req.userConnected = decodedUser.id;

    if(!decodedUser) return res.json({
        msg: "Token invalide ou expire!"
    });

    next()
}

module.exports = isLogin;
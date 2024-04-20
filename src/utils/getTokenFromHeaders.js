const getTokenFromHeaders = req => {
    const headersData = req.headers;
    const token = 
    headersData['Auth-Token'] ?
    headersData['Auth-Token'] : '';
    if(token !== undefined){
        return token;
    }
    return false;
}

module.exports = getTokenFromHeaders;

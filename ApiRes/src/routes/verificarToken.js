var jwt = require('jsonwebtoken')

const very =function verificarToken(req, res, next) {
    const token = req.headers.authorization;
    console.log("token" , token);
    if (token) {
        const tokendos = token.split(" ")[1];
        console.log('soy token dos' , tokendos)
        if (tokendos == null) {
            return res.sendStatus(406);
        }
        jwt.verify(JSON.parse(tokendos), 'secre', (err, response) => {
            if (err) {
                console.log(err);
                return res.sendStatus(401);  
            }
            next()
        })
    } else {
        res.sendStatus(403);
    }
}

export default very
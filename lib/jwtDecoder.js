import jwt from 'jsonwebtoken'

export  function getEmailFromToken(token){
    const decoded=  jwt.decode(token);
    // console.log(decoded);
    return decoded.id;
}
import config  from '../config/config.js';
import jwt from 'jsonwebtoken';

export default function generateToken(paylod:object){

    const token=jwt.sign(paylod,config.jwtsecret,{expiresIn:'7d'});
    return token;
}




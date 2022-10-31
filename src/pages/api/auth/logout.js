import {verify} from 'jsonwebtoken';
import {serialize} from 'cookie';

export default function logoutHandler(req, res) {
    //obtenermos la cookie
    const {myTokenName} =  req.cookies;

    //vemos si existe la cookie
    if(!myTokenName){
        return res.status(401).json({error: 'no token'})
    }
     //validamos el token
     try{
       verify(myTokenName, 'secret');
        //con el metodo serialized lo serializamos
        //generamos una cookie en el navegador
        const serialized = serialize('myTokenName', null, {
           // httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path:'/',

        })

        //creamos un header y lo enviamos con la cookie
        res.setHeader('Set-Cookie', serialized)
        return res.status(200).json('Logout exitoso');
    }
    catch(err){
        return res.status(401).json({error: "invalid token"})
    }
}
import  jwt  from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res){


    
    console.log(req.body);
    //obtenemos de req.body el email y el password enviado
    const {usuario, password} =  req.body;
    //validamos si el usuario es correcto
    if(usuario  && password ){
        //creamos un token con el metodo sign
        const token = jwt.sign({
                exp: Math.floor(Date.now()/ 1000) + 60 * 60  *24 * 30,
                user: usuario,
                password:password,

            }, 'secret'/*Variable con el que se crea el token*/)

        //con el metodo serialized lo serializamos
        //generamos una cookie en el navegador
            const serialized = serialize('myTokenName', token, {
                httpsOnly:true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path:'/',
    
            })
            //creamos un header y lo enviamos con la cookie
            res.setHeader('Set-Cookie', serialized)
            return res.json('Login exitoso');
        
        }

       

    return res.status(401).json({error:'invalid name or password'});
}
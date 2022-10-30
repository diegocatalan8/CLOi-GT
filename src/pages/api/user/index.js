import {conn} from '../../../utils/database'; 

export default async (req, res)=>{
    
    //DESTRUCTURAMOS REQ PARA OBTENER EL METODO
     //Body sirve para ver la agrupacion de datos que envian 
    const {method, body}=req;
   
    //UTILIZAMOS UN SWITCH PARA VER EL METODO QUE NOS VIENE
    switch(method){

        //METODO GET DEVOLVEMOS ESTATUS 200
        case 'GET': 
            try{
            //Creamos una consulta
            const query = 'SELECT * FROM TBL_USUARIO';
            const response =  await conn.query(query);
            
            res.status(200).json(response.rows);
            break;
            }
            catch(error){
                res.status(400).json({error :error.message});
            }

        //METODO POST DEVOLVEMOS ESTATUS 200
        case 'POST':
            try{
            //Obtenesmos el objeto body de req
            console.log(body);
            //Destructuramos el objeto body que seran las propiedades del json de los datos
            //que se mandaron
            const {usuario, password, localidad, telefono} = body;
            //Creamos una consulta
            const query = "INSERT INTO TBL_USUARIO(USUARIO, PASSWD, TELEFONO, DIRECCION_ID) VALUES($1, $2, $3, $4) RETURNING *";
            //Creamos un array con los valores
            const values = [usuario, password, telefono, localidad];
            //Creamos una peticion a la base de datos
            const response =  await conn.query(query, values);
            
            res.status(200).json(response.rows[0]);
            break;

            }catch(error){
                res.status(400).json({error :error.message});
                
            }
        //METODO DEFAULT DEVOLVEMOS ESTATUS 400
        default:
            res.status(400).json("invalid method");
            
            break;
            
        
        
    }

}
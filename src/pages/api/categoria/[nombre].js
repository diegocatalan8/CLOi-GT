import {conn} from '../../../utils/database'; 

export default async (req, res)=>{
    
    //DESTRUCTURAMOS REQ PARA OBTENER EL METODO
     //Body sirve para ver la agrupacion de datos que envian 
    const {method, query, body}=req;
   
    //UTILIZAMOS UN SWITCH PARA VER EL METODO QUE NOS VIENE
    switch(method){

        //METODO GET DEVOLVEMOS ESTATUS 200
        case 'GET': 
            try{
            //Creamos una consulta
            const query1 = 'SELECT id, categoria, nombre_restaurante from TBL_CATEGORIA_PRODUCTO WHERE nombre_restaurante = $1';
            const values = [query.nombre];
            //Obtenemos la respuesta
            const response = await conn.query(query1, values);

            if(response.rows.length === 0){
                return res.status(404).json({message: "No se encontro la categoria"});
            }
            
            res.status(200).json(response.rows);
            break;
            }
            catch(error){
                res.status(400).json({error :error.message});
            }

       
        //METODO DEFAULT DEVOLVEMOS ESTATUS 400
        default:
            res.status(400).json("invalid method");
            break;
            
        
        
    }

}
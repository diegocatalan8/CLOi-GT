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
            const query = 'SELECT r.nombre, r.descripcion, r.telefono, r.imagen, r.delivery_info, r.direccion_id, rd.id, rd.direccion_id, rd.coordenadas, m.municipio, d.departamento FROM TBL_RESTAURANTE AS r INNER JOIN TBL_RESTAURANTE_DIRECCION AS rd ON r.direccion_id = rd.id INNER JOIN TBL_MUNICIPIO AS m ON rd.direccion_id = m.id INNER JOIN TBL_DEPARTAMENTO AS d ON m.departamento_id = d.id ';
            const response =  await conn.query(query);
            
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
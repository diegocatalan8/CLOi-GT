import { conn } from "../../../utils/database";

//Funcion que se usara para obtener, editar o eliminar una tarea especifica
export default async (req, res)=>{
    //Method sirve para ver que metodo viene
    //Query sirve para ver que id viene
   
    const {method, query, body} = req;
    

    switch (method) {
        case 'GET':
            try{
            //Hacemos la consulta y especificamos el valor a consultar con query
            const query1 = 'SELECT id, dia, horarios FROM TBL_HORARIOS WHERE NOMBRE_RESTAURANTE = $1';
            const values = [query.restaurante];
            //Obtenemos la respuesta
            const response = await conn.query(query1, values);

            if(response.rows.length === 0){
                return res.status(404).json({message: "No se encontro la direccion"});
            }

            res.status(200).json(response.rows);
            break;
            }
            catch(error){
                res.status(400).json({error: error});
            }
            
        
    
        default:
            res.status(400).json("method not allowed");
            break;
    }
}
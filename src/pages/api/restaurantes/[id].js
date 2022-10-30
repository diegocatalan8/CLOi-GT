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
            const query1 = 'SELECT r.nombre, r.descripcion, r.telefono, r.imagen, r.delivery_info, r.direccion_id, rd.id, rd.direccion_id, rd.coordenadas, m.municipio, d.departamento FROM TBL_RESTAURANTE AS r INNER JOIN TBL_RESTAURANTE_DIRECCION AS rd ON r.direccion_id = rd.id INNER JOIN TBL_MUNICIPIO AS m ON rd.direccion_id = m.id INNER JOIN TBL_DEPARTAMENTO AS d ON m.departamento_id = $1';
            const values = [query.id];
            //Obtenemos la respuesta
            const response = await conn.query(query1, values);

            if(response.rows.length === 0){
                return res.status(404).json({message: "No se encontraron restaurantes"});
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
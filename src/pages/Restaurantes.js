import React, {useState, useEffect} from 'react'
import Navigation from '../components/Navigation'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';



export default function Restaurantes() {
//usamos el useState para guardar los valores
const [restaurante, setRestaurante] = useState([]);
//usamos el useState para guardar el nombre del municipio
const [municipio, setMunicipio] = useState("");

//Ruteo
const router = useRouter();

console.log(router.query.id);

//Funcion que va a cargar los restaurantes
const loadRestaurants = async (id) =>{
    try{
    const res = await fetch('http://localhost:3000/api/restaurantes/'+id);
    const restaurant = await res.json();
    setRestaurante(restaurant);
    setMunicipio(restaurant[0].municipio);
    }
    catch(e){
        console.log(e);
    }
 }



 //Utilizamos un useEfect para que ejecute la funcion cargar los restaurantes 
 //solo si cambia el router.query.id
 useEffect( ()=>{
    try{
        loadRestaurants(router.query.id);
    }
    catch(e){
        console.log(e);
    }
     
 }, [router.query.id])

 
 
 console.log(restaurante)
 

  return (
    <div>
        <Navigation/>
        <div  style={{
            textAlign:"center", 

        }} >
        {municipio == "" ? (
        <h2 style={{ 
        color:"#444251", 
       
    }}>No hay restaurantes</h2>
        ) :(
            <h2 style={{ color:"#444251", textAlign:"center"}}>{municipio}</h2>
        )
        }
        </div>


        <div className='row' style={{
            display:"flex",
            flexDirection:"column",
            alignContent:"center",
            alignItems:"center",
            marginBottom:"40px"

        
        }}>
           
               {
           municipio != "" ?     restaurante.map(res=>(
                    
                    <Card
                        key={res.id}
                        body
                        style={{
                            
                            width: '18rem',
                            marginTop:"40px",
                            borderRadius:"15px",
                            boxShadow:"0px 0px 10px #444251"
                        }}
                        >
                       <Image
                       src={`/imagenes/${res.imagen}`}
                       alt={res.nombre}
                       width={200}
                       height={200}
                       style={{borderRadius:"15px"}}
                       >
                       </Image>
                        <CardBody>
                            <CardTitle tag="h5">
                            {res.nombre}
                            </CardTitle>
                            <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                            >
                            {res.descripcion} <br/> {res.municipio}, {res.departamento}
                            </CardSubtitle>
                            <CardText>
                            {res.delivery_info}
                            </CardText>
                            <Button onClick={()=>router.push(`/Menu?nombre=${res.nombre}&descripcion=${res.descripcion}&telefono=${res.telefono}&municipio=${res.municipio}&departamento=${res.departamento}&imagen=${res.imagen}`)} style={{backgroundColor:"#F24F04", border:"none"}} className='buttonOrange col-12'>
                            Entrar
                            </Button>
                        </CardBody>
                        </Card>
                      
                        
                ))
                :
                (
                   console.log("No hay restaurantes")
                )
            }
               
          
        </div>
        

       

    </div>
  )
}



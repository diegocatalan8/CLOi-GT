import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ButtonOrange } from '../components/ComponentsFormularios/FormStyles';
import HeaderMenu from '../components/HeaderMenu';
import SeleccionMenu from '../components/SeleccionMenu';
import Loading from './Loading'


export default function Menu() {
    //Estado para setear las categorias
    const [categorias, setCategorias] = useState("");
    //Estado de pantalla loading 
    const [loading, setLoading] = useState(false);
    //Estado para guardar la seleccion del menu, se la pasamos de props a el componente SeleccionMenu
    const [seleccion, setSeleccion] = useState("");
    //Usamor el ruteo
    const router = useRouter();
    //Variables que las obtenemos de lo que pasamos en el ruteo
    const restauranteNombre = router.query.nombre;
    const telefono = router.query.telefono;
    const descripcion = router.query.descripcion;
    const municipio = router.query.municipio;
    const departamento = router.query.departamento;
    const imagen = router.query.imagen;


//Funcion que va a cargar las categorias
const loadCategorias = async (nombre) =>{
    try{
    const res = await fetch('http://localhost:3000/api/categoria/'+nombre);
    const categoria = await res.json();
        
    setCategorias(categoria);
    }
    catch(e){
        console.log(e);
    }
 }

 


 
 useEffect( ()=>{

    loadCategorias(restauranteNombre);
    

    setTimeout(()=>{
        setLoading(true);
    }, 3000)
    
   

 },[restauranteNombre])

 console.log(categorias);
 console.log(seleccion);
 

 

  return (
    loading == false ? (<div><Loading/></div>):(
    <div>
          <HeaderMenu 
          restauranteNombre={restauranteNombre} 
          telefono={telefono} 
          descripcion={descripcion}  
          municipio={municipio}
          departamento={departamento}
          img = {imagen}
          />

        <div style={{
            marginTop:"70px",
            textAlign:"center"
        }}>
            <p style={{color:"#F24F04"}} >Nuestro Menú</p>
            <h2 >Descubre Nuestro Menú</h2>
        </div>


        <div 
            style={{
                display:"flex",
                flexDirection:"row",
                alignContent:"space-around",
                alignItems:"center",
                overflowX:"scroll",
                maxWidth:"80%",
                margin:"0 auto",
                marginTop:"45px",
            }}
        >
                {
                    categorias.map(item=>(
                        <button  
                        type='button' 
                        className='selectMenu'
                        onClick={()=>setSeleccion(item.id)}
                        >{item.categoria}</button>
                    ))
                
                }
        </div>
       
         <SeleccionMenu seleccion={seleccion}/>
          

    </div>)
  )
}


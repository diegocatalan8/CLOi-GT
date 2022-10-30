import React, { useEffect, useState } from 'react'
import { ButtonOrange } from './ComponentsFormularios/FormStyles'
import ModalProto from './Modal'
import Navigation from './Navigation'



export default function HeaderMenu({restauranteNombre, telefono, descripcion, municipio, departamento, img}) {


    //Estado para guardar los horarios
    const [horarios, setHorarios] = useState("");

    //Funcion que va a cargar los horarios
const loadHorarios = async (restaurante) =>{
    try{
    const res = await fetch('http://cloi-gt.vercel.app/api/horarios/'+restaurante);
    const horario = await res.json();
        
    setHorarios(horario);
    }
    catch(e){
        console.log(e);
    }
 }

 useEffect(()=>{
    loadHorarios(restauranteNombre);
 }, [])

 console.log(horarios);

   
  return (
    <div className='container-fluid' >
            <Navigation/>
        <div className='row'>

        
            <figure style={{height:"300px"}} className='col-12 col-lg-6' >
                <img
                    style={{width:"100%", height:"310px",  borderRadius:"15px"}}
                    src={`/imagenes/${img}`}
                    alt={restauranteNombre}
                />
               
            </figure>
            <div  style={{
                
                height:"300px",
                display:"flex",
                flexDirection:"column",
                alignContent:"center",
                alignItems:"center",
                paddingTop:"2vh",
                margin:"0 auto",
                borderRadius:"15px",
                
                
                
                
            }} className='col-11 col-lg-6 '>
                <h2 style={{textAlign:"center"}}>{restauranteNombre}</h2>
                <p>{descripcion}</p>
                <p>{municipio}, {departamento}</p>
                
               <a href={`tel://${telefono}`}>
                <ButtonOrange className='buttonOrange' style={{marginTop:"15px"}}>
                        <svg style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                        Llamar
                </ButtonOrange>
                </a> 
                <ModalProto restauranteNombre={restauranteNombre} horarios={horarios}>Button</ModalProto>

            </div>
        </div>   
    </div>
  )
}

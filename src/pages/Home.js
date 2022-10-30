import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {ButtonOrange, Titulo} from "../components/ComponentsFormularios/FormStyles";
import Image from 'next/image'
import mapa from '../../public/mapa.svg';
import logo from '../../public/logo.jpg';
import { useRouter } from 'next/router';

export default function (props) {
    //destructuracion de props
    const {direccion} = props;
    
    //ruteo
    const router =  useRouter();
    
//Estado para guardar el id de la opcion seleccionada
const [localidad, setLocalidad ] = useState({campo:"", valido:null });
//onChange que cambia el estado
const onChangeLocalidad = (e) => {
    setLocalidad({campo: e.target.value, valido: null});
}
//Validacion de la seleccion
const validacionNombreLocalidad = (e)=>{
    if(localidad.campo){
        if(localidad.campo == ""){
           
            setLocalidad({campo: e.target.value, valido:null});
        }
        
        else if(localidad.campo != 'Selecciona una opción'){
           
            setLocalidad({campo: e.target.value, valido:true});    
        }
        else{
            
            setLocalidad({campo: e.target.value, valido:false}); 
        }
    }
}

//Clase para el input de localidad
var inputClaseLocalidad; //Variable que sera la clase para el campo input, cambiara de verde a rojo.
var errorFieldLocalidad; //variable que sera la clase que muestre el mensaje de error.
var validoFieldLocalidad; //variable que sera la clase que muestre el mensaje de validacion.

if(localidad.valido == true){
    inputClaseLocalidad = "campoVerde";
    validoFieldLocalidad = "mensajeVerde";
    errorFieldLocalidad = "none";
   
    
}
else if(localidad.valido == false){
    inputClaseLocalidad = "campoRojo";
    errorFieldLocalidad = "mensajeRojo";
    validoFieldLocalidad = "none";
    
}
else if(localidad.valido == null){
    inputClaseLocalidad = "";
    errorFieldLocalidad = "none";
    validoFieldLocalidad = "none";

}


   

    //funcion que se ejecuta al enviar el formulario
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(localidad.valido == true){
            console.log(localidad.campo);
            router.push(`/Restaurantes?id=${localidad.campo}`);
        }
       
    }



  return (
    <div>
        <Navigation/>
        <Form onSubmit={handleSubmit} style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            color:"#444251",
            }}>

            <FormGroup className='mt-4 col-9 '>
                
                <Input style={{
                    height:"48px", 
                    borderRadius:"12px"
                 }} 
                 type="select" 
                 name="localidad" 
                 id="localidad"
                 className={inputClaseLocalidad}
                 onBlur={validacionNombreLocalidad}
                 onChange={onChangeLocalidad}  >
                 <option selected>Selecciona una opción</option>
                {direccion.map((objeto)=>(
                    
                <option  key={objeto.id} value={objeto.id}>{objeto.municipio}, {objeto.departamento}</option>
                       
                  
                )
            )}
            
                </Input>
                <div class={validoFieldLocalidad}>
                Excelente!
                </div>
                <div class={errorFieldLocalidad}>
                Selecciona una opción.
                </div>
                </FormGroup>
                <ButtonOrange  style={{width:"75%"}} className='mt-2 button-orange'>Buscar</ButtonOrange>
                        
            </Form>


            <div style={{
                
                maxWidth:"80%", 
                margin:"0 auto", 
                display:"flex", 
                flexWrap:"wrap", 
                flexDirection:"row", 
                alignItems:"center", 
                justifyContent:"space-around",
                justifyItems:"center",
                 
            }}>
                <figure  style={{width:"300px", heigth:"300px", marginTop:"60px"}}>
                    <Image style={{width:"100%", heigth:"100%"}} src={mapa} alt="mapa" />
                </figure>
                <div style={{textAlign:"center", color:"#444251", marginTop:"60px"}}>
                    <h4 style={{marginBottom:"25px"}} >¿Quieres aparecer en nuestra lista de restaurantes?</h4>
                    <p style={{marginBottom:"0"}}>Llena el siguiente formulario</p>
                    <p >para registrarte.</p>
                    <ButtonOrange style={{color:"white", backgroundColor:"#CBCBCB", width:"100%"}} className='mt-3 mb-5'>Proximamente</ButtonOrange>
                </div>
            </div>




            <div style={{
                
                maxWidth:"80%", 
                margin:"0 auto", 
                display:"flex", 
                flexWrap:"wrap", 
                flexDirection:"row", 
                alignItems:"center", 
                justifyContent:"space-around",
                justifyItems:"center",  
                borderBottom:"2px solid #444251"
            }}>

                <div style={{textAlign:"center", color:"#444251", marginTop:"40px", }}>
                    <h4 style={{marginBottom:"25px", textAlign:"start"}} >¿Qué es CLOi-GT?</h4>
                    <p style={{marginBottom:"0", textAlign:"justify"}}>CLOi-GT es una aplicación web que centraliza restaurantes de Guatemala a nivel de oriente que podran ser encontrados por medio de su motor de busqueda, brindando al usuario todo tipo de informacion como la localizacion, menu, delivery del restaurante y horas de atencion al cliente.</p>
                    
                </div>
                <figure  style={{width:"100vh", heigth:"400px", marginTop:"80px"}}>
                        <Image style={{width:"100%", heigth:"100%"}} src={logo} alt="mapa" />
                </figure>
                
            </div>

            <div style={{
                
                paddingBottom:"50px"
            }}>
                   <Titulo style={{
                        marginTop:"5%",
                        marginBottom:"10px",
                        fontSize:"25px",
                       
                   }}>CLOi-GT</Titulo>
                   <p style={{
                        textAlign:"center",
                        marginTop:"0"
                   }}>Diseñado y Desarrollado por <a style={{color:"#F24F04", cursor:"pointer"}}>@diegocatalan8</a></p>
                   
                   <div style={{
                    
                    
                    margin:"0 auto",
                    marginTop:"30px",
                    textAlign:"center"
                    
                }}>
                            <svg style={{color:"#F24F04", marginLeft:"5px", marginRight:"25px"}} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                            <svg style={{color:"#F24F04", }} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>

                   </div>

            </div>

           
           
            
                


    </div>
  )
}

//FUNCION ESPECIAL QUE RECIBE UN CONTEXTO QUE RETORNA ALGO
export const getServerSideProps = async () =>{

    const res = await fetch('http://localhost:3000/api/direccion');
    const direccion = await res.json();
  
    console.log(direccion);
  
  
    return {
      props: {
        direccion: direccion,
      }
    }
  }
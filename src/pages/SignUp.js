import React, { useEffect, useState } from 'react';
import {Titulo, ButtonOrange} from "../components/ComponentsFormularios/FormStyles";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import  { useRouter } from 'next/router';

export default function SignUp(props) {
    const {direccion} = props;
   

    //Creamos la variable que nos proporciona el ruteo
    const router = useRouter();


    

    //Expresiones regulares
  const expresiones = {

    nombreUsuario: /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-)[a-zA-Z0-9])*[a-zA-Z0-9]+$/ ,// Para nombres de usuarios
    nombrePassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/, // Para password.
    nombreLocalidad: /^[a-zA-ZÀ-ÿ\s]{5,15}$/,// Letras y espacions, pueden llevar acentos
    nombreTelefono: /[1-9][0-9]{7}/ ,// 1 a 8 numeros.

	
}
//Destructuracion de objeto de expresiones regulares
const {nombreUsuario, nombrePassword, nombreLocalidad, nombreTelefono} = expresiones;
//Estados para la validacion del formulario
const [usuario, setUsuario ] = useState({campo:"", valido:null });
const [password, setPassword ] = useState({campo:"", valido:null });
const [localidad, setLocalidad ] = useState({campo:"", valido:null });
const [telefono, setTelefono ] = useState({campo:"", valido:null });
const [enviar, setEnviar] =  useState({
    usuario:"",
    password:"",
    telefono:"",
    localidad:"",
});


//Estados para validacion
const [userValidation, setUserValidation] = useState("");





//Funciones onChange para los inputs
const onChangeUsuario = (e) => {
    
    setUsuario({campo: e.target.value, valido: null});    
    setEnviar({...enviar, usuario: e.target.value});
    
  }
  const onChangePassword = (e) => {
      setPassword({campo: e.target.value, valido: null});
      setEnviar({...enviar, password: e.target.value});
  }
  const onChangeLocalidad = (e) => {
      setLocalidad({campo: e.target.value, valido: null});
      setEnviar({...enviar, localidad: e.target.value});
  }
  const onChangeTelefono = (e) => {
      setTelefono({campo: e.target.value, valido: null});
      setEnviar({...enviar, telefono: e.target.value});
  }

  ////////////////////////////////////////////////
    //Validacion para las expresiones regulares
    const validacionNombreUsuario = (e)=>{
        
        if(nombreUsuario){
            if(usuario.campo == ""){
               
                setUsuario({campo: e.target.value, valido:null});
            }
            
            else if(nombreUsuario.test(usuario.campo)){

               
                setUsuario({campo: e.target.value, valido:true});    
               
            }
            else{
                
                setUsuario({campo: e.target.value, valido:false}); 
            }

            userValidation.map((item)=>{
                if(usuario.campo === item.usuario ){
                    setUsuario({campo: e.target.value, valido:false}); 

                }
            });
        }
    }
    const validacionNombrePassword = (e)=>{
        if(nombrePassword){
            if(password.campo == ""){
               
                setPassword({campo: e.target.value, valido:null});
            }
            
            else if(nombrePassword.test(password.campo)){
               
                setPassword({campo: e.target.value, valido:true});    
            }
            else{
                
                setPassword({campo: e.target.value, valido:false}); 
            }
        }
    }
    const validacionNombreLocalidad = (e)=>{
        if(nombreLocalidad){
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

    const validacionNombreTelefono = (e)=>{
        if(nombreTelefono){
            if(telefono.campo == ""){
               
                setTelefono({campo: e.target.value, valido:null});
            }
            
            else if(nombreTelefono.test(telefono.campo)){
               
                setTelefono({campo: e.target.value, valido:true});    
            }
            else{
                
                setTelefono({campo: e.target.value, valido:false}); 
            }
            userValidation.map((item)=>{
                if(telefono.campo === item.telefono ){
                    setTelefono({campo: e.target.value, valido:false}); 

                }
            });
        }
    }

//////////////////////////////
//Estados para las clases
//////////////////////////////

//Clase para el input de nombre de usuario
var inputClaseUsuario; //Variable que sera la clase para el campo input, cambiara de verde a rojo.
var errorFieldUsuario; //variable que sera la clase que muestre el mensaje de error.
var validoFieldUsuario; //variable que sera la clase que muestre el mensaje de validacion.

if(usuario.valido == true){
    inputClaseUsuario = "campoVerde";
    validoFieldUsuario = "mensajeVerde";
    errorFieldUsuario = "none";
   
    
}
else if(usuario.valido == false){
    inputClaseUsuario = "campoRojo";
    errorFieldUsuario = "mensajeRojo";
    validoFieldUsuario = "none";
    
}
else if(usuario.valido == null){
    inputClaseUsuario = "";
    errorFieldUsuario = "none";
    validoFieldUsuario = "none";

}
//Clase para el input de password
var inputClasePassword; //Variable que sera la clase para el campo input, cambiara de verde a rojo.
var errorFieldPassword; //variable que sera la clase que muestre el mensaje de error.
var validoFieldPassword; //variable que sera la clase que muestre el mensaje de validacion.

if(password.valido == true){
    inputClasePassword = "campoVerde";
    validoFieldPassword = "mensajeVerde";
    errorFieldPassword = "none";
   
    
}
else if(password.valido == false){
    inputClasePassword = "campoRojo";
    errorFieldPassword = "mensajeRojo";
    validoFieldPassword = "none";
    
}
else if(password.valido == null){
    inputClasePassword = "";
    errorFieldPassword = "none";
    validoFieldPassword = "none";

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

//Clase para el input de telefono
var inputClaseTelefono; //Variable que sera la clase para el campo input, cambiara de verde a rojo.
var errorFieldTelefono; //variable que sera la clase que muestre el mensaje de error.
var validoFieldTelefono; //variable que sera la clase que muestre el mensaje de validacion.

if(telefono.valido == true){
    inputClaseTelefono = "campoVerde";
    validoFieldTelefono = "mensajeVerde";
    errorFieldTelefono = "none";
   
    
}
else if(telefono.valido == false){
    inputClaseTelefono = "campoRojo";
    errorFieldTelefono = "mensajeRojo";
    validoFieldTelefono = "none";
    
}
else if(telefono.valido == null){
    inputClaseTelefono = "";
    errorFieldTelefono = "none";
    validoFieldTelefono = "none";

}

//Peticion para crear un usuario, le pasamos un usuario como
//parametro que se lo vamos a enviar como json, Especificamos que la peticion
//sera post
const createUser = async(user)=>{
   

    

      console.log(user);

  await fetch('http://cloi-gt.vercel.app/api/user', 
        {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        }
        );
       
    }

    //peticion para pedir el usuario
    const userLoad = async ()=>{
        const response = await fetch("http://cloi-gt.vercel.app/api/user");
        const usuario = await response.json();

        setUserValidation(usuario);
       



    }
    
    //Funcion que envia los datos del formulario
    const handleSubmit =  async (e)=>{
        e.preventDefault();
       
        if(usuario.valido == true && password.valido == true && localidad.valido == true && telefono.valido == true ){
            
            console.log("Esta entrando");
            try{ await createUser(enviar);
            }catch(e){console.log(e)}
            router.push("/SignIn");
         
            
            }
       
        
    }

    useEffect(()=>{
        userLoad();
        console.log(userValidation);

    }, [])
  


   
  return (
        <div>
            <div className='col-12 col-lg-4' style={{
                
                margin:"0 auto",
                height:"100%",
            }}>
                    <Titulo style={{marginTop:"50px"}}>Sign Up</Titulo>

                    <Form className='needs-validation'  onSubmit={handleSubmit} style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        color:"#444251",
                       

                    }}>
                        <FormGroup className='col-9 '>
                            <Label for="usuario">Usuario</Label>
                            <Input 
                           
                            name="usuario" 
                            className={inputClaseUsuario}
                            onChange={onChangeUsuario} 
                            onBlur={validacionNombreUsuario}
                            value={usuario.campo} 
                            style={{height:"48px" }} 
                            type="text" 
                            id="usuario" 
                            placeholder="Ingrese un nombre de usuario" />
                            
                            <div class={validoFieldUsuario}>
                                 Excelente!
                            </div>
                            <div class={errorFieldUsuario}>
                            El nombre de usuario ya existe o 
                            los nombres de usuario pueden consistir en minúsculas, mayusculas, numeros y sin espacios.
                            </div>

                        </FormGroup>
                        <FormGroup className='col-9'>
                            <Label for="password">Password</Label>
                           
                            <Input 
                            className={inputClasePassword}
                            name="password" 
                            onChange={onChangePassword} 
                            onBlur={validacionNombrePassword}
                            value={password.campo}  
                            style={{height:"48px" }} 
                            type="password" 
                            id="password" 
                            placeholder="Ingrese un password" />

                            <div class={validoFieldPassword}>
                            Excelente!
                            </div>
                            <div class={errorFieldPassword}>
                            El password debe ser minimo 8 caracteres, maximo 15, almenos una letra mayuscula, una minuscula, un digito, no espacios en blanco y un caracter especial.
                            </div>

                        </FormGroup>
                        <FormGroup className='col-9'>
                            <Label for="localidad">Dirección</Label>
                            <Input 
                            className={inputClaseLocalidad}
                            name="localidad" 
                            onChange={onChangeLocalidad}  
                            onBlur={validacionNombreLocalidad}
                            style={{height:"48px" }} 
                            type="select" 
                            id="localidad">
                            <option>Selecciona una opción</option>
                                {direccion.map(objeto=>(
                                        <option key={objeto.id} value={objeto.id}>{objeto.municipio}, {objeto.departamento}</option>
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

                        <FormGroup className='col-9'>
                            <Label for="telefono">Telefono</Label>
                            <Input 
                            className={inputClaseTelefono}
                            name="telefono" 
                            onChange={onChangeTelefono}
                            onBlur={validacionNombreTelefono} 
                            value={telefono.campo}  
                            style={{height:"48px" }} 
                            type="text" 
                            id="telefono" 
                            placeholder="Ingrese su numero de telefono" />

                            <div class={validoFieldTelefono}>
                            Excelente!
                            </div>
                            <div class={errorFieldTelefono}>
                                El numero de telefono debe de ser de 8 digitos.
                            </div>
                        </FormGroup>
                        
                        <ButtonOrange  type='submit' className='button-orange'>REGISTRARSE</ButtonOrange>
                    
                    </Form>
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
  
import React, {useEffect, useState} from 'react'
import {Titulo, ButtonOrange} from '../components/ComponentsFormularios/FormStyles';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useRouter } from 'next/router';

export default function SignIn() {

    //Estados para la validacion del formulario
    const [usuario, setUsuario ] = useState({campo:"", valido:true });
    const [password, setPassword ] = useState({campo:"", valido:true });
    const [enviar, setEnviar] =  useState({
        usuario:"",
        password:"",
    
    });
    
    //Estados para validacion
    const [userValidation, setUserValidation] = useState("");
    const [error, setError] = useState("none");
    //Estado para el conteo
    const [contador, setContador] = useState(0);

    //Funciones onChange para los inputs
    const onChangeUsuario = (e) => {
        
        setUsuario({campo: e.target.value, valido: true});    
        setEnviar({...enviar, usuario: e.target.value});
        
    }
    const onChangePassword = (e) => {
        setPassword({campo: e.target.value, valido: true});
        setEnviar({...enviar, password: e.target.value});
        
    }

    const validacionCampos = ()=>{
        if(usuario.campo == "" && password.campo == ""){
                
            setError("none")
            console.log("vacio")

        }
        

    }
   



//peticion para pedir el usuario
const userLoad = async ()=>{
    const response = await fetch("https://cloi-gt.vercel.app/api/user");
    const usuario = await response.json();

    setUserValidation(usuario);
   
}

    const router = useRouter();

    //Peticion para crear la cookie
    const createCookie = async(user)=>{
   
        console.log(user);
  
    await fetch('https://cloi-gt.vercel.app/api/auth/login', 
          {
          method:'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
          }
          );
         
      }

    //Funcion que envia los datos del formulario
    const handleSubmit =  async (e)=>{
        e.preventDefault();

        userValidation.map((item)=>{
            
            if(usuario.campo == item.usuario && password.campo == item.passwd){
                
                console.log("Entro")
                setError("none")

                try{
                    console.log(enviar);
                    console.log("Se esta creando la cookie...");
                    createCookie(enviar);
                    
                    
                    
                }catch(e){
                    console.log(e);
                }

                setTimeout(()=>{
                    router.push("/");
                }, 1000)


            }
           
            if(usuario.campo != item.usuario || password.campo != item.passwd){
                 
               setError("mensajeRojo");
                console.log("no entro");
                setContador(contador+1);
                
            }

           

            
        });
       
       
        
    }


    useEffect(()=>{
        userLoad();
        console.log(userValidation);

    }, [error])


    
  

  return (
    <div>
            <div className='col-12 col-lg-4' style={{
                        
                margin:"0 auto",
                height:"100%",
            }}>
                    <Titulo>Sign In</Titulo>

                    <Form onSubmit={handleSubmit} style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"center",
                        alignItems:"center",
                        color:"#444251"
                    

                    }}>
                    <div className={error}>
                   
                    El nombre de usuario o la contraseña son incorrectos.
                    </div>

                    <FormGroup className='col-9 '>
                            <Label for="usuario">Usuario</Label>
                            <Input 
                            onChange={onChangeUsuario} 
                            onBlur={validacionCampos}
                            value={usuario.campo} 
                            style={{height:"48px" }} 
                            type="text" name="usuario" 
                            id="usuario" 
                            placeholder="Ingrese un nombre de usuario" 
                            />
                           
                    </FormGroup>
                    <FormGroup className='col-9'>
                            <Label for="password">Password</Label>
                            <Input 
                            onChange={onChangePassword} 
                            onBlur={validacionCampos}
                            value={password.campo}  
                            style={{height:"48px" }} 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Ingrese un password"
                             />
                    </FormGroup>
                    <p className='forgotPassword' style={{
                        width:"70%",
                        textAlign:"right",
                        color:"#444251",
                       
                    }}>Forgot Password?</p>

                    {
                       contador < 3 ? (
                    <ButtonOrange  className="button-orange">LOGIN</ButtonOrange>
                       ):
                       (
                    <ButtonOrange style={{backgroundColor:"gray", color:"black"}}  className="button-orange">LOGIN</ButtonOrange>
                       )
                    }
                    <p onClick={()=>router.push('./SignUp')} className='forgotPassword' style={{
                        width:"70%",
                        textAlign:"center",
                        color:"#444251",
                        marginTop:"20vh"
                       
                    }}>Don’t have an Account? Sign up</p>

                    </Form>

            </div>
    
    </div>
  )
}

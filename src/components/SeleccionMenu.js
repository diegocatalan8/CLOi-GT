import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap';

export default function SeleccionMenu({seleccion}) {

    //Estado para setear las comidas de la peticion loadMenu
    const [menus, setMenus] = useState([]);
     //Estado de pantalla loading 
     const [loading, setLoading] = useState(false);


    //Funcion que va a cargar las categorias
const loadMenu = async (id) =>{
    try{
    const res = await fetch('http://localhost:3000/api/producto/'+id);
    const menu = await res.json();
    setMenus(menu);
        

    }
    catch(e){
        console.log(e);
    }
 }


 useEffect(()=>{
    loadMenu(seleccion);

    setTimeout(()=>{
        setLoading(true);
    }, 2000)
 }, [seleccion])

 console.log(menus);
  return (
    <div  style={{width:"100%", marginTop:"50px",  
}} >
        {
            loading == false ? (<h3 style={{textAlign:"center", marginTop:"40px", }}>Cargando...</h3>) :
            (
                <div   style={{
                    width:"100%", 
                    heigth:"100%", 
                   
                    display:"flex",
                    flexDirection:"row",
                    flexWrap:"wrap",
                    alignContent:"center",
                    alignItems:"center",
                    marginBottom:"80px",
                   
                      
                }}>
                {
                    menus.map(item=>(
                    <div className='col-10 col-lg-2 sombreado'  style={{
                        boxShadow:"0px 0px 5px black",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        alignContent:"center",
                        paddingTop:"35px",
                        marginLeft:"30px",
                        marginTop:"20px",
                        borderRadius:"15px",
                        border:"1px solid grey",
                        textAlign:"center",
                      
                     
                    }} >
                        <figure style={{width:"150px", heigth:"200px"}}>
                            <img alt={item.imagen} style={{width:"100%", heigth:"100%", borderRadius:"15px"}} src={`/imagenes/${item.imagen}`}/>
                        </figure>

                        <p style={{maxWidth:"150px"}}>{item.nombre}</p>
                        <h4 style={{marginBottom:"45px", color:"#F24F04"}}>Q {item.precio}</h4>

                    </div>
                    ))
                }
                
                </div>
            )
          
        }
       
    
    </div>
  )
}

import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.jpg';
import Router, { useRouter } from 'next/router';

export default function Loading() {
  const router = useRouter();

  useEffect(()=>{
    setTimeout(()=>{
        router.push('/Home');
    }, 2000)
  }, [])
  
  return (
    <div style={{
        position:"relative",
        paddingTop:"30vh"
                }}>
        
                <div style={{
                    display:"flex", 
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems:"center"
                    }}>

                            <h1 style={{color:"#F24F04"}}>
                            CLOi-GT
                            </h1>
                            <figure style={{ width:"200px", height:"200px"}}>
                                <Image style={{borderRadius:"50%",width:"100%", height:"100%"}} src={logo} alt="Logo"/>
                            </figure>
                            <h2 style={{color:"#F24F04"}} >Cargando...</h2>
                </div>
    </div>
  )
}

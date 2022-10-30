import React from 'react'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export  async function middleware(request) {
 
  //Obtenemos la coockie
  const jwt = request.cookies.get("myTokenName");
  //Verificamos si es igual a undefined
  if(jwt == undefined){
    console.log("Entro");
    return NextResponse.redirect(new URL("/", request.url));
  }

  try{
    const {payload} = await jwtVerify(jwt, new TextEncoder().encode("secret"));
    console.log(payload);
    return NextResponse.next();

  }catch(e){
    console.log(e);
    return NextResponse.redirect(new URL("/", request.url));
  }
  
}

export const config = {
    matcher: ['/Home', '/Loading', '/LoadingHome', '/Restaurantes' ]
}

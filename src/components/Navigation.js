import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {Titulo} from "../components/ComponentsFormularios/FormStyles";
import axios from "axios"
import { useRouter } from 'next/router';



  export default function Navigation() {

    const router = useRouter();

    const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);


   //Peticion para borrar la cookie
   const deleteCookie = async()=>{
    const response = await axios.post('/api/auth/logout');
    console.log(response);
            
          }

  return (
    <div className='navigationBar' style={{
        padding:"20px",
        position:"sticky",
        top:"0",
        zIndex:"1"

    }}>
      <Navbar style={{marginTop:"10px", marginLeft:"10px"}} color="faded" light>
        <NavbarBrand href="/Home" className="me-auto">
          <Titulo style={{marginTop:"0", marginBottom:"0"}}>CLOi-GT</Titulo>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" style={{color:"#444251",}} />
        <Collapse   isOpen={!collapsed} navbar>
          <Nav  navbar>
          <NavItem>
              <NavLink style={{color:"#444251"}} href="/Home">
                    Home
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink onClick={deleteCookie} style={{color:"#444251"}} href="/SignIn">
                  Logout
            </NavLink>
          </NavItem>
          
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

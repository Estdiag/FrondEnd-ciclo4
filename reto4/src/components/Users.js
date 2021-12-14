import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useHistory } from "react-router-dom";
import Perfiles from "./tablaUsuarios";

function Users() {


    return(
       <div>
           <br></br>
           <h3 className="text-center">Usuarios</h3>
           <br></br>
            <Perfiles />
          <Button href='./FormUser' variant="outline-primary">Agregar</Button>
         
       </div>
    )
}

export default Users

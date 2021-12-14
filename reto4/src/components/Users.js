import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useHistory } from "react-router-dom";
import Perfiles from "./tablaUsuarios";

function Users() {
    const history = useHistory();
    const routeChange = () =>{ 
      let path = `FormUser`; 
      history.push(path);
    };

    return(
       <div>
           <br></br>
           <h3 className="text-center">Usuarios</h3>
           <br></br>
            <Perfiles />
          <Button onClick={routeChange} variant="outline-primary">Agregar</Button>      
         
       </div>
    )
}

export default Users

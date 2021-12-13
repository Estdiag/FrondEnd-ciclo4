import React from 'react'
import FormUser from './FormUser'
import Button from 'react-bootstrap/esm/Button'
import  {useState} from 'react';
import Perfiles from "./tablaUsuarios";

function Users() {

    const [buttonClicked, setButtonClicked] = useState(false);

    let handleButtonClick = () => {
        setButtonClicked(true)
    }

    return(
       <div>
           <br></br>
           <h3 className="text-center">Usuarios</h3>
           <br></br>
            <Perfiles />
          <Button onClick={handleButtonClick} variant="outline-primary">Agregar</Button>      
         

            {buttonClicked ? <FormUser/> : null}
       </div>
    )
}

export default Users

import React from 'react'
import FormUser from './FormUser'
import Button from 'react-bootstrap/esm/Button'
import  {useState} from 'react';


function Users() {

    const [buttonClicked, setButtonClicked] = useState(false);

    let handleButtonClick = () => {
        setButtonClicked(true)
    }

    return(
       <div>
           <h1>Aqui va el listado</h1>
          <Button onClick={handleButtonClick} variant="outline-primary">Agregar</Button>      
         

            {buttonClicked ? <FormUser/> : null}
       </div>
    )
}

export default Users

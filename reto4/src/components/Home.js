import React from "react";
import Form from 'react-bootstrap/Form'
import Buttons from "./Buttons";
import Formulario from "./Formulario";

function Home() {
  return (
    <div>
            <Form>
        <br/>
        <h3 className="text-center">INICIAR SESIÓN</h3>
        <Formulario label="Correo electronico" placeholder="name@example.com" type="email"/>
        <Formulario label="Contraseña" placeholder="Escriba su contraseña" type="password" />
        <br/>
        
        <Buttons/>
      </Form>
    </div>
  );
}

export default Home;

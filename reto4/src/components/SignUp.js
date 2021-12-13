import React from "react";
import Form from "react-bootstrap/Form";
import Buttons from "./Buttons";
import Formulario from "./Formulario";

function SignUp() {
  return (
    <Form>
        <h3 className="text-center">CREA TU CUENTA</h3>
      <Formulario label="Nombre" placeholder="Nombre y apellido" type="text" />
      <Formulario label="Correo electronico" placeholder="name@example.com" type="email" />
      <Formulario label="Confirme su correo" placeholder="name@example.com" type="email" />
      <Formulario label="Contraseña" placeholder="Cree una contraseña" type="password" />
      <Formulario label="Confirme su contraseña" placeholder="Confirme su contraseña" type="password" />
      <Buttons/>
    </Form>
  );
}

export default SignUp;

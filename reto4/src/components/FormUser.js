import React from "react";
import Form from "react-bootstrap/Form";
import Buttons from "./Buttons";
import Formulario from "./Formulario";


function FormUser() {
  return (
    <>
      
      
      <Form>
        <br />

        <Formulario
          label="Numero de identificación"
          placeholder="identificación"
          type="number"
        />
        <Formulario
          label="Nombre y apellido"
          placeholder="Nombre y apellido"
          type="text"
        />
        <Formulario
          label="Dirección"
          placeholder="Escriba su dirección"
          type="text"
        />
        <Formulario
          label="Celular"
          placeholder="Escriba su # de celular"
          type="text"
        />
        <Formulario
          label="Correo electronico"
          placeholder="name@example.com"
          type="email"
        />
        <Formulario
          label="Contraseña"
          placeholder="Escriba una contraseña segura"
          type="password"
        />
        <Formulario label="Zona" placeholder="Zona" type="text" />
        <Form.Group className="col-md-5 mx-auto">
          <Form.Label>¿Tipo de usuario?</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Selecciona un tipo de usuario</option>
            <option value="1">Coordinador de zona</option>
            <option value="2">Asesor comercial</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Buttons />
      </Form>
    </>
  );
}

export default FormUser;

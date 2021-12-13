import React from "react";
import Form from "react-bootstrap/Form";
import Buttons from "./Buttons";
import Formulario from "./Formulario";


function FormLaptop() {
  return (
    <Form>
      <br></br>
      <h3 className="text-center">REGISTRAR UN EQUIPO</h3>
      <Formulario label="Marca" placeholder="Escribe la marca" type="text" />
      <Formulario label="Modelo" placeholder="Ingrese el modelo" type="text" />
      <Formulario
        label="Procesador"
        placeholder="Cual es el procesador"
        type="text"
      />
      <Formulario label="Sistema Operativo" placeholder="SO" type="text" />
      <Formulario
        label="Descripción"
        placeholder="Ingrese una descripción"
        type="text"
      />
      <Formulario label="Memoria" placeholder="Memoria" type="text" />
      <Formulario label="Disco Duro" placeholder="Disco Duro" type="text" />
      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>¿Hay Disponibilidad?</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>¿Está disponible?</option>
          <option value="1">SI</option>
          <option value="2">NO</option>
        </Form.Select>
      </Form.Group>

      <Formulario label="Precio" placeholder="Precio" type="number" />
      <Formulario
        label="Cantidad"
        placeholder="¿Cuántos hay en existencia?"
        type="number"
      />

      <br />
      <Buttons/>
      
    </Form>
  );
}

export default FormLaptop;

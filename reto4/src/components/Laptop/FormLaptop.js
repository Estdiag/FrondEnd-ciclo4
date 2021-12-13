import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

function FormLaptop() {
  return (
    <Form>
      <h3 className="text-center">REGISTRAR UN EQUIPO</h3>
      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Marca</Form.Label>
        <Form.Control type="text" placeholder="Ingrese la marca" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Modelo</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el modelo" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Procesador</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el procesador" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Sistema Operativo</Form.Label>
        <Form.Control type="text" placeholder="SO" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Descripción</Form.Label>
        <Form.Control type="text" placeholder="Ingrese una descripción" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Memoria</Form.Label>
        <Form.Control type="text" placeholder="Memoria" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Disco Duro</Form.Label>
        <Form.Control type="text" placeholder="Disco Duro" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>¿Hay Disponibilidad?</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>¿Está disponible?</option>
          <option value="1">SI</option>
          <option value="2">NO</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto" controlId="formBasicPassword">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" placeholder="Precio del equipo" />
      </Form.Group>

      <Form.Group className="col-md-5 mx-auto" controlId="formBasicPassword">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control type="number" placeholder="¿Cuántos hay en existencia?" />
      </Form.Group>
<br/>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Button variant="secondary">Guardar</Button>
        <Button variant="outline-secondary">Cancelar</Button>
      </Stack>
    </Form>
  );
}

export default FormLaptop;

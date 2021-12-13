import React from "react";
import Form from "react-bootstrap/Form";

class FormularioPedidos extends React.Component {
  render() {
    return (
      <>
      <h3 className="text-center">INGRESE SU PEDIDO</h3>
      <Form.Group className="col-md-5 mx-auto">
        <Form.Label>Vendedor</Form.Label>
        <Form.Select aria-label="Default select example">
          <option></option>
          <option value="1">Vendor1</option>
          <option value="2">Vendor2</option>
        </Form.Select>
      </Form.Group>
      
      </>
    );
  }
}
export default FormularioPedidos;
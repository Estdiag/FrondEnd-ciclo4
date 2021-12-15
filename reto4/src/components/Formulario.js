import React from 'react'
import Form from "react-bootstrap/Form";

function Formulario({label, placeholder, type, value, onchange, valueasdate}) {
    return (
        <Form.Group className="col-md-5 mx-auto">
        <Form.Label>{label}</Form.Label>
        <Form.Control required 
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onchange}
          />
      </Form.Group>
    )
}

export default Formulario

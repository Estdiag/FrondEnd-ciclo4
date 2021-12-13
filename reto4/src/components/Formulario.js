import React from 'react'
import Form from "react-bootstrap/Form";

function Formulario({label, placeholder, type}) {
    return (
        <Form.Group className="col-md-5 mx-auto">
        <Form.Label>{label}</Form.Label>
        <Form.Control required type={type} placeholder={placeholder}/>
      </Form.Group>
    )
}

export default Formulario

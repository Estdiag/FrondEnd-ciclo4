import React from 'react'
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

function Buttons() {
    return (
        <Stack gap={2} className="col-md-5 mx-auto">
        <Button variant="secondary" type="submit">
          Aceptar
        </Button>
        <Button variant="outline-secondary">Cancelar</Button>
      </Stack>
    )
}

export default Buttons

import React from "react";
import Form from "react-bootstrap/Form";
import Buttons from "./Buttons";
import Formulario from "./Formulario";
import { postRequest } from "../Requests";
import { withAlert } from 'react-alert'

import HOST from "../HostConfig";

const SAVE_URL = HOST+'/laptop/new';

class FormLaptop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marca: '',
      modelo: '',
      procesador: '',
      so: '',
      descripcion: '',
      memoria: '',
      disco: '',
      disponible: 'true',
      precio: 0,
      cantidad: 0
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.saveLaptop = this.saveLaptop.bind(this);

  }

  handleChanges = (prop) => (event) => {
    let newState = {};
    newState[prop] = event.target.value;
    this.setState(newState); 
  } 

  saveLaptop = async (event) => {
    event.preventDefault();
    const alert = this.props.alert;
    let laptop = {
      brand: this.state.marca,
      model: this.state.modelo,
      procesor: this.state.procesador,
      os: this.state.so,
      description: this.state.descripcion,
      memory: this.state.memoria,
      hardDrive: this.state.disco,
      availability: this.state.disponible === "true",
      price: this.state.precio,
      quantity: this.state.cantidad,
      photography: ""
    };

    let request = await postRequest(SAVE_URL, laptop);
    if(request.status != 201)
      alert.error("Ha ocurrido un error al guardar el producto");
    else
      alert.success("Se ha guardado el producto");
  }

  render () {
    return (
      <Form onSubmit={this.saveLaptop}>
        <br></br>
        <h3 className="text-center">REGISTRAR UN EQUIPO</h3>
        <Formulario label="Marca" 
          placeholder="Escribe la marca" 
          type="text"
          value={this.state.marca} 
          onchange={this.handleChanges('marca')}/>
        <Formulario label="Modelo" 
          placeholder="Ingrese el modelo" 
          type="text" 
          value={this.state.modelo} 
          onchange={this.handleChanges('modelo')}/>
        <Formulario
          label="Procesador"
          placeholder="Cual es el procesador"
          type="text"
          value={this.state.procesador} 
          onchange={this.handleChanges('procesador')}
        />
        <Formulario 
          label="Sistema Operativo"
          placeholder="SO" 
          type="text"
          value={this.state.so} 
          onchange={this.handleChanges('so')}
        />
        <Formulario
          label="Descripción"
          placeholder="Ingrese una descripción"
          type="text"
          value={this.state.descripcion} 
          onchange={this.handleChanges('descripcion')}
        />
        <Formulario 
          label="Memoria" 
          placeholder="Memoria" 
          type="text"
          value={this.state.memoria} 
          onchange={this.handleChanges('memoria')} />
        <Formulario 
          label="Disco Duro" 
          placeholder="Disco Duro" 
          type="text"
          value={this.state.disco} 
          onchange={this.handleChanges('disco')} />
        <Form.Group className="col-md-5 mx-auto">
          <Form.Label>¿Hay Disponibilidad?</Form.Label>
          <Form.Select aria-label="Default select example" 
            defaultValue={this.state.disponible} 
            onChange={this.handleChanges('disponible')}>
            <option>¿Está disponible?</option>
            <option value="true">SI</option>
            <option value="false">NO</option>
          </Form.Select>
        </Form.Group>

        <Formulario 
          label="Precio"
          placeholder="Precio"
          type="number"
          value={this.state.precio} 
          onchange={this.handleChanges('precio')} />
        <Formulario
          label="Cantidad"
          placeholder="¿Cuántos hay en existencia?"
          type="number"
          value={this.state.cantidad} 
          onchange={this.handleChanges('cantidad')}
        />

        <br />
        <Buttons/>
        
      </Form>
    );
  }
}

export default withAlert()(FormLaptop);

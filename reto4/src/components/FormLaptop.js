import React from "react";
import Form from "react-bootstrap/Form";
import Buttons from "./Buttons";
import Formulario from "./Formulario";
import { postRequest, putRequest } from "../Requests";
import { withAlert } from 'react-alert'

import HOST from "../HostConfig";

const SAVE_URL =`${HOST}/laptop/new`;
const UPDATE_URL =`${HOST}/laptop/update`;

class FormLaptop extends React.Component {
  constructor(props) {
    super(props);
    if(props.props)
      this.state=props.props;
    else
      this.state = {
        id: null,
        brand: '',
        model: '',
        procesor: '',
        os: '',
        description: '',
        memory: '',
        hardDrive: '',
        availability: 'true',
        price: 0,
        quantity: 0,
        editing: false
      };
    
    this.handleChanges = this.handleChanges.bind(this);
    this.saveLaptop = this.saveLaptop.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);

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
      id: this.state.id,
      brand: this.state.brand,
      model: this.state.model,
      procesor: this.state.procesor,
      os: this.state.os,
      description: this.state.description,
      memory: this.state.memory,
      hardDrive: this.state.hardDrive,
      availability: this.state.availability === "true",
      price: this.state.price,
      quantity: this.state.quantity,
      photography: " "
    };
    let request;
    if(this.state.editing)
      request = await putRequest(UPDATE_URL, laptop);
    else
      request = await postRequest(SAVE_URL, laptop);
    
    if(request.status !== 201)
      alert.error("Ha ocurrido un error al guardar el producto");
    else
      alert.success("Se ha guardado el producto");
    
    this.submitClick();
  }

  submitClick(sucessState) {
    if(this.state.editing)
      this.props.closeEdit(sucessState);
  }

  cancelClick(){
    if(this.state.editing)
      this.props.closeEdit();
    else
      this.props.history.push('laptops')
  }

  render () {
    return (
      <Form onSubmit={async (e) => await this.saveLaptop(e)}>
        <br></br>
        <h3 className="text-center">{this.state.editing?"EDITAR UN EQUIPO":"REGISTRAR UN EQUIPO"}</h3>
        <Formulario label="Marca" 
          placeholder="Escribe la marca" 
          type="text"
          value={this.state.brand} 
          onchange={this.handleChanges('brand')}/>
        <Formulario label="Modelo" 
          placeholder="Ingrese el modelo" 
          type="text" 
          value={this.state.model} 
          onchange={this.handleChanges('model')}/>
        <Formulario
          label="Procesador"
          placeholder="Cual es el procesador"
          type="text"
          value={this.state.procesor} 
          onchange={this.handleChanges('procesor')}
        />
        <Formulario 
          label="Sistema Operativo"
          placeholder="SO" 
          type="text"
          value={this.state.os} 
          onchange={this.handleChanges('os')}
        />
        <Formulario
          label="Descripción"
          placeholder="Ingrese una descripción"
          type="text"
          value={this.state.description} 
          onchange={this.handleChanges('description')}
        />
        <Formulario 
          label="Memoria" 
          placeholder="Memoria" 
          type="text"
          value={this.state.memory} 
          onchange={this.handleChanges('memory')} />
        <Formulario 
          label="Disco Duro" 
          placeholder="Disco Duro" 
          type="text"
          value={this.state.hardDrive} 
          onchange={this.handleChanges('hardDrive')} />
        <Form.Group className="col-md-5 mx-auto">
          <Form.Label>¿Hay Disponibilidad?</Form.Label>
          <Form.Select aria-label="Default select example" 
            defaultValue={this.state.availability} 
            onChange={this.handleChanges('availability')}>
            <option>¿Está disponible?</option>
            <option value="true">SI</option>
            <option value="false">NO</option>
          </Form.Select>
        </Form.Group>

        <Formulario 
          label="Precio"
          placeholder="Precio"
          type="number"
          value={this.state.price} 
          onchange={this.handleChanges('price')} />
        <Formulario
          label="Cantidad"
          placeholder="¿Cuántos hay en existencia?"
          type="number"
          value={this.state.quantity} 
          onchange={this.handleChanges('quantity')}
        />

        <br />
        
        <Buttons submitClick={this.submitClick} cancelClick={this.cancelClick}/>
        
      </Form>
    );
  }
}

export default withAlert()(FormLaptop);

import React from "react";
import Form from "react-bootstrap/Form";
import Buttons from "./Buttons";
import Formulario from "./Formulario";
import { postRequest, putRequest } from "../Requests";
import { withAlert } from 'react-alert'

import HOST from "../HostConfig";

const SAVE_URL =`${HOST}/user/new`;
const UPDATE_URL =`${HOST}/user/update`;
class FormUser extends React.Component {
  constructor(props) {
    super(props);
    if(props.props)
      this.state=props.props;
    else
      this.state = {
        id: null,
        identification: '',
        name: '',
        birthtDay: new Date().toISOString(),
        monthBirthtDay: '',
        address: '',
        cellPhone: '',
        email: '',
        password: '',
        zone: '',
        type: ''
      };
    
    this.handleChanges = this.handleChanges.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.getValidDate = this.getValidDate.bind(this);
  }

  handleChanges = (prop) => (event) => {
    let newState = {};
    newState[prop] = event.target.value;
    this.setState(newState); 
  }
  
  saveUser = async (event) => {
    event.preventDefault();
    event.target.checkValidity();
    
    const alert = this.props.alert;
    let user = {
      id: this.state.id,
      identification: this.state.identification,
      name: this.state.name,
      birthtDay: this.state.birthtDay,
      monthBirthtDay: new Date(this.state.birthtDay).getMonth() + 1,
      address: this.state.address,
      cellPhone: this.state.cellPhone,
      email: this.state.email,
      password: this.state.password,
      zone: this.state.zone,
      type: this.state.type,
    };
    let request;
    if(this.state.editing)
      request = await putRequest(UPDATE_URL, user);
    else
      request = await postRequest(SAVE_URL, user);
    
    if(request.status !== 201)
      alert.error("Ha ocurrido un error al guardar el usuario");
    else
      alert.success("Se ha guardado el usuario");
    
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
      this.props.history.push('users')
  }
  
  getValidDate(){
    try{
      let date = new Date(this.state.birthtDay).toISOString().substr(0, 10);
      this.setState( {birthtDay: date} );
    }catch(Exception) {}
    
  }

  render() {
    return (
      <>
        <Form onSubmit={this.saveUser}>
          <br />

          <Formulario
            label="Numero de identificación"
            placeholder="identificación"
            type="number"
            value={this.state.identification} 
            onchange={this.handleChanges('identification')}
          />
          <Formulario
            label="Nombre y apellido"
            placeholder="Nombre y apellido"
            type="text"
            value={this.state.name} 
            onchange={this.handleChanges('name')}
          />
          <Formulario
            label="Fecha Nacimiento"
            placeholder="Escriba su fecha de nacimiento"
            type="date"
            value={new Date(this.state.birthtDay).toISOString().substr(0, 10)}
            onchange={this.getValidDate}
          />
          <Formulario
            label="Dirección"
            placeholder="Escriba su dirección"
            type="text"
            value={this.state.address} 
            onchange={this.handleChanges('address')}
          />
          <Formulario
            label="Celular"
            placeholder="Escriba su # de celular"
            type="text"
            value={this.state.cellPhone} 
            onchange={this.handleChanges('cellPhone')}
          />
          <Formulario
            label="Correo electronico"
            placeholder="name@example.com"
            type="email"
            value={this.state.email} 
            onchange={this.handleChanges('email')}
          />
          <Formulario
            label="Contraseña"
            placeholder="Escriba una contraseña segura"
            type="password"
            value={this.state.password} 
            onchange={this.handleChanges('password')}
          />
          <Formulario label="Zona" placeholder="Zona" type="text" value={this.state.zone} onchange={this.handleChanges('zone')}/>
          
          <Form.Group className="col-md-5 mx-auto">
            <Form.Label>¿Tipo de usuario?</Form.Label>
            <Form.Select defaultValue={this.state.type} onChange={this.handleChanges('type')}>
              <option>Selecciona un tipo de usuario</option>
              <option value="COORD">Coordinador de zona</option>
              <option value="ASE">Asesor comercial</option>
            </Form.Select>
          </Form.Group>
          <br />
          <Buttons submitClick={this.submitClick} cancelClick={this.cancelClick}/>
        </Form>
      </>
    );
  }

}

export default withAlert()(FormUser);

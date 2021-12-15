import React from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Buttons from "./Buttons";
import { getJson, postRequest } from "../Requests";
import Modal from 'react-bootstrap/Modal';
import { withAlert } from "react-alert";

import HOST from '../HostConfig';


const INITIAL_STATUS = "Pendiente";
const EMPLOYEES_URL = `${HOST}/user/all`;
const EMPLOYEE_URL = `${HOST}/user/`;
const PRODUCTS_URL = `${HOST}/laptop/all`;
const SAVE_URL = `${HOST}/order/new`;



class FormOrder extends React.Component {
  constructor(props) {
    super(props);
    if (props.props)
      this.state = props.props;
    else
      this.state = {
        id: null,
        identification: '',
        name: '',
        birthtDay: '',
        monthBirthtDay: '',
        address: '',
        cellPhone: '',
        email: '',
        password: '',
        zone: '',
        type: '',
        employees: [],
        products: [],
        orderProducts: [],
        quantities: {},
        showProductsModal: false,
        salesMan: '',
        temp: false
      };

    this.handleLoad = this.handleLoad.bind(this);
    this.loadEmployees = this.loadEmployees.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addProducts = this.addProducts.bind(this);
    this.hanldeChecboxChanged = this.hanldeChecboxChanged.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    
    this.handleLoad();
  }

  handleChanges = (prop) => (event) => {
    let newState = {};
    newState[prop] = event.target.value;
    this.setState(newState); 
  }

  async handleLoad() {
    this.loadEmployees();
    this.loadProducts();
  }

  handleQuantity(event){
    let id = event.target.dataset.id;
    let quantities = this.state.quantities;
    quantities[id] = event.target.value;
    this.setState( {quantities: quantities} );
  }

  async loadEmployees() {
    let employeesJson = await getJson(EMPLOYEES_URL);
    let employees = [];
    Object.values(employeesJson).forEach(emp => employees.push(emp));
    this.setState({ employees: employees });
  }

  async loadProducts() {
    let productsJson = await getJson(PRODUCTS_URL);
    let products = [];
    const checkSelected = (id) => this.state.orderProducts.some(x => `${x.id}` === `${id}`);
    Object.values(productsJson).forEach(prod => products.push( { ...{checked: checkSelected(prod.id)}, ...prod}));
    this.setState({ products: products });
  }

  hanldeChecboxChanged(event){
    let id = event.target.dataset.id;
    let products = this.state.products.map(prod => {
      if(`${prod.id}` === id)
        prod.checked = event.target.checked;
      return prod;
    })
    this.setState( {products: products} );
  }

  addProducts(){
    let orderProducts = this.state.products.filter(prod => prod.checked);
    this.setState({orderProducts: orderProducts});
    this.closeModal();
  }

  openModal() {
    this.loadProducts();
    this.setState({showProductsModal: true});
  }

  closeModal() {
    this.loadProducts();
    this.setState({showProductsModal: false});
  }

  async saveOrder(event){
    event.preventDefault();
    event.target.checkValidity();
    const alert = this.props.alert;

    if(this.state.orderProducts.length < 1){
      alert.error("Debe seleccionar por lo menos 1 producto");
      return;
    }
    
    let now = new Date();
    let userId = this.state.salesMan;
    let user = await getJson(EMPLOYEE_URL+userId);
    let products = {};
    let quantities = {};
    let i = 1;
    this.state.orderProducts.forEach(el => products[i++] = el);
    i = 1;
    Object.values(this.state.quantities).forEach(el => quantities[i++] = el);

    let order= {
      registerDay: now,
      status: INITIAL_STATUS,
      salesMan: user,
      products: products,
      quantities: quantities
    }

    let request = await postRequest(SAVE_URL, order);
    let json = await request.json();
    if(request.status !== 201)
      alert.error("Ha ocurrido un error al guardar la orden");
    else
      alert.success(`Se ha guardado la orden ${json.id}`);
    
  }

  cancelClick(event){
    this.props.history.push('orders');
  }

  render() {
    return (
      <>
        <Form onSubmit={this.saveOrder}>
          <h3 className="text-center">INGRESE SU PEDIDO</h3>
          <Form.Group className="col-md-5 mx-auto">
            <Form.Label>Vendedor</Form.Label>
            <Form.Select value={this.state.salesMan} onChange={this.handleChanges('salesMan')} required>
              <option value="" selected disabled>Seleccione Vendedor</option>
              {
                this.state.employees.map(emp => (
                  <option value={emp.id} key={emp.id} >{emp.name}</option>
                ))
              }
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-md-5 mx-auto">
            <Form.Label className="text-primary">Productos</Form.Label>
            <Table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.orderProducts.map(prod => (
                    <tr>
                      <td>{prod.description}</td>
                      <td>
                        <Form.Control 
                          type="number"
                          defaultValue={0} 
                          value={this.state.quantities[prod.id]}
                          required min="1"
                          data-id={prod.id}
                          onChange={this.handleQuantity}/></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <Button variant="outline-primary" onClick={this.openModal}>Agregar Producto</Button>
          </Form.Group>
          <br/>
          <Buttons cancelClick={this.cancelClick}/>
        </Form>

        <Modal size="xl" show={this.state.showProductsModal}>
          <Modal.Header>
            <Modal.Title>Agregar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th></th>
                  <th scope="col" className='d-none'>id</th>
                  <th scope="col">brand</th>
                  <th scope="col">model</th>
                  <th scope="col">procesor</th>
                  <th scope="col">os</th>
                  <th scope="col">description</th>
                  <th scope="col">memory</th>
                  <th scope="col">hardDrive</th>
                  <th scope="col">availability </th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">photography</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.products.map((row) => (
                    <tr key={row.id} >
                      {row.checked?
                        <td><Form.Check data-id={row.id} checked onChange={this.hanldeChecboxChanged}/></td>:
                        <td><Form.Check data-id={row.id} onChange={this.hanldeChecboxChanged}/></td>
                      }
                      <td>{row.brand}</td>
                      <td>{row.model}</td>
                      <td>{row.procesor}</td>
                      <td>{row.os}</td>
                      <td>{row.description}</td>
                      <td>{row.memory}</td>
                      <td>{row.hardDrive}</td>
                      <td>{row.availability ? "Si" : "No"}</td>
                      <td>{row.price}</td>
                      <td>{row.quantity}</td>
                      <td>{row.photography}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={this.addProducts}>Agregar</Button>
            <Button variant="outline-secondary" onClick={this.closeModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default withAlert()(FormOrder);
import Table from 'react-bootstrap/Table';
import React from "react";
import Button from "react-bootstrap/Button";
import { getJson, putRequest } from "../Requests";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Formulario from './Formulario';
import { withAlert } from "react-alert";
import FilterOrder from './FilterOrder';

import HOST from "../HostConfig";

const GET_URL = `${HOST}/order/all`;
const UPDATE_URL = `${HOST}/order/update`;
const STATUS_URL = `${HOST}/order/state/`;
class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            showEditModal: false,
            showDetailsModal: false,
            editingItem: null,
            orderProducts: [],
            orderQuantities: [],
            filtering: false
        };

        this.getOrders = this.getOrders.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openDetailModal = this.openDetailModal.bind(this);
        this.handleStateChanged = this.handleStateChanged.bind(this);
        this.saveOrder = this.saveOrder.bind(this);
        this.handleFilter = this.handleFilter.bind(this);


        this.getOrders();
    }

    async saveOrder(event) {
        event.preventDefault();
        event.target.checkValidity();
        const alert = this.props.alert;
        let order = this.state.editingItem;

        let request = await putRequest(UPDATE_URL, order);
        let json = await request.json();
        if (request.status !== 201)
            alert.error("Ha ocurrido un error al guardar la orden");
        else
            alert.success(`Se ha actualizado la orden ${json.id}`);
        
        this.closeModal();
    }

    openDetailModal(event) {
        let id = event.target.dataset.id;
        let order = this.state.rows.find(r => `${r.id}` === id);
        let products = Object.values(order.products);
        let quantities = Object.values(order.quantities);
        this.setState({ orderProducts: products, orderQuantities: quantities, showDetailsModal: true });
    }

    openEditModal(event) {
        let id = event.target.dataset.id;
        let item = this.state.rows.find(r => `${r.id}` === id)
        this.setState({ editingItem: item, showEditModal: true });
    }

    closeModal() {
        this.setState({ showEditModal: false, editingItem: null, showDetailsModal: false, orderProducts: [] });
        this.getOrders()
    }

    async getOrders(URL) {
        let url = URL||GET_URL;
        let orders = await getJson(url);
        let rows = []
        Object.values(orders).forEach(row => rows.push(row));
        this.setState({ rows: rows });
    }
    handleFilter(filter){
        let hasActiveFilters;
        hasActiveFilters = filter? true : false;

        this.setState({ filtering: hasActiveFilters });
        
        if(!hasActiveFilters) {this.getOrders(); return };
        let stado;
        let IdNama;
        
        if(filter.filterName === "Estado"){
            stado=filter.value.Estado;
            IdNama = filter.value.IDName;
        }

        if(stado.length>0  && IdNama > 0){
            this.getOrders(STATUS_URL+stado+"/"+IdNama);
        }
        

    }

    handleStateChanged(event) {
        let item = this.state.editingItem;
        item.status = event.target.value;
        this.setState({ editingItem: item });
    }

    render() {
        return (
            <>
                <br></br>
                <h2 className="text-center">
                    Pedidos en espera
                </h2>
                <br></br>
                <FilterOrder onFilterApply={this.handleFilter}/>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col" className='escondido'>id</th>
                            <th scope="col">registerDay</th>
                            <th scope="col">status</th>
                            <th scope="col">salesMan id</th>
                            <th scope="col">salesMan name</th>
                            <th scope="col">salesMan email</th>
                            <th scope="col">Products</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.rows.map(row => (
                                row.salesMan &&
                                    <tr>
                                        <td>{row.registerDay}</td>
                                        <td>{row.status}</td>
                                        <td>{row.salesMan.id}</td>
                                        <td>{row.salesMan.name}</td>
                                        <td>{row.salesMan.email}</td>
                                        <td className='text-center'>
                                            <Button data-id={row.id} variant="outline-info" className="products-button" onClick={this.openDetailModal}>
                                                <svg data-id={row.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                </svg>
                                            </Button>
                                        </td>
                                        <td className="text-center">
                                            <Button variant="primary" data-id={row.id} onClick={this.openEditModal}>Editar</Button>
                                        </td>

                                    </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Button href='./FormOrder' variant="outline-primary">Agregar</Button>

                <Modal size="xl" show={this.state.showDetailsModal}>
                    <Modal.Header>
                        <Modal.Title>Detalle Orden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table >
                            <thead>
                                <tr>
                                    <th scope="col" className="d-none">id</th>
                                    <th scope="col">brand</th>
                                    <th scope="col">model</th>
                                    <th scope="col">procesor</th>
                                    <th scope="col">os</th>
                                    <th scope="col">description</th>
                                    <th scope="col">memory</th>
                                    <th scope="col">hardDrive</th>
                                    <th scope="col">availability</th>
                                    <th scope="col">price</th>
                                    <th scope="col">available quantity</th>
                                    <th scope="col">photography</th>
                                    <th scope="col">order quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orderProducts.map(prod => (
                                        <tr>
                                            <td>{prod.brand}</td>
                                            <td>{prod.model}</td>
                                            <td>{prod.procesor}</td>
                                            <td>{prod.os}</td>
                                            <td>{prod.description}</td>
                                            <td>{prod.memory}</td>
                                            <td>{prod.hardDrive}</td>
                                            <td>{prod.availability ? "Si" : "No"}</td>
                                            <td>{prod.price}</td>
                                            <td>{prod.quantity}</td>
                                            <td>{prod.photography}</td>
                                            <td>{this.state.orderQuantities.pop(0)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-primary' onClick={this.closeModal}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal size="xl" show={this.state.showEditModal}>
                    <Modal.Header>
                        <Modal.Title>Editar Orden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{
                        this.state.editingItem &&
                        <Form class="form-control">
                            <Formulario
                                label="Numero Pedido"
                                type="number"
                                readonly
                                value={this.state.editingItem.id}
                            />
                            <Formulario
                                label="Fecha"
                                type="date"
                                readonly
                                value={new Date(this.state.editingItem.registerDay).toISOString().substr(0, 10)}
                            />
                            <Form.Group className="col-md-5 mx-auto">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select value={this.state.editingItem.status} onChange={this.handleStateChanged}>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Aprobada">Aprobada</option>
                                    <option value="Rechazada">Rechazada</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-primary' onClick={this.saveOrder}>Guardar</Button>
                        <Button variant='outline-secondary' onClick={this.closeModal}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default withAlert()(Orders);
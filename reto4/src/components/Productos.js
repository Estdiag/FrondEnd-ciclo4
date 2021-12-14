import React from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog'
import Button from 'react-bootstrap/esm/Button';
import FormLaptop from './FormLaptop';
import { getJson, deleteRequest } from "../Requests";
import { withAlert } from "react-alert";
import HOST from "../HostConfig";

const GET_URL = `${HOST}/laptop/all`;
const DELETE_URL = `${HOST}/laptop/`;
class Productos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            showEditModal: false,
            editingItem: null
        };

        this.getLaptops = this.getLaptops.bind(this);
        this.deleteLaptop = this.deleteLaptop.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.getLaptops();
    }

    openModal(event){
        let id = event.target.dataset.id;
        this.setState({showEditModal: true});
        let item = this.state.rows.find( r => r.id == id)
        this.setState( {editingItem: item} );
    }

    closeModal(){
        this.setState({showEditModal: false});
        this.setState( {editingItem: null} );
        this.getLaptops()
    }

    async deleteLaptop(event) {
        const alert = this.props.alert;
        let id = event.target.dataset.id;
        let request = await deleteRequest(`${DELETE_URL}${id}`);
        if (request.status != 204)
            alert.error("Ha ocurrido un error al eliminar el producto");
        else
            alert.success("Se ha eliminado el producto");
        this.getLaptops();
    }

    async getLaptops() {
        let laptops = await getJson(GET_URL);
        let rows = []
        Object.values(laptops).map(row => rows.push(row));
        this.setState({ rows: rows });
    }

    render() {
        return (
            <>
                <br></br>
                <h2 className="text-center">
                    Productos en venta
                </h2>
                <br></br>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col" className='escondido'>id</th>
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
                            <th scope="col" colSpan="2" className="text-center">actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.rows.map((row) => (
                                <tr key={row.id}>
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
                                    <td className="text-center">
                                        <Button variant="primary" data-id={row.id} onClick={this.openModal}>Editar</Button>
                                    </td>
                                    <td className="text-center">
                                        <Button onClick={this.deleteLaptop} data-id={row.id} variant="danger">Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Button href='./FormLaptop' variant="outline-primary">Agregar</Button>

                <Modal show={this.state.showEditModal}>
                    <Modal.Header>
                        <Modal.Title>Editar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormLaptop props={ {...this.state.editingItem, ...{editing: true} } } closeEdit={this.closeModal}/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>

        );
    }
}

export default withAlert()(Productos);
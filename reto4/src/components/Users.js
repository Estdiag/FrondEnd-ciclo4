import Table from 'react-bootstrap/Table';
import React from "react";
import "./ocultarId.css";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { getJson, deleteRequest } from "../Requests";
import { withAlert } from "react-alert";
import FormUser from './FormUser'

import HOST from "../HostConfig";

const GET_URL = `${HOST}/user/all`;
const DELETE_URL = `${HOST}/user/`;

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            showEditModal: false,
            editingItem: null
        };

        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.getUsers();
    }

    openModal(event){
        let id = event.target.dataset.id;
        let item = this.state.rows.find( r => r.id == id)
        this.setState( {editingItem: item, showEditModal: true} );
    }

    closeModal(){
        this.setState({showEditModal: false, editingItem: null});
        this.getUsers()
    }

    async deleteUser(event) {
        const alert = this.props.alert;
        let id = event.target.dataset.id;
        let request = await deleteRequest(`${DELETE_URL}${id}`);
        if (request.status !== 204)
            alert.error("Ha ocurrido un error al eliminar el usuario");
        else
            alert.success("Se ha eliminado el usuario");
        this.getUsers();
    }

    async getUsers() {
        let users = await getJson(GET_URL);
        let rows = []
        Object.values(users).map(row => rows.push(row));
        this.setState({ rows: rows });
    }

    render() {
        return (
            <>
                <br></br>
                <h3 className="text-center">Usuarios</h3>
                <br></br>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>

                            <th scope="col">identification</th>
                            <th scope="col">name</th>
                            <th scope="col">birthtDay</th>
                            <th scope="col">monthBirthtDay</th>
                            <th scope="col">address</th>
                            <th scope="col">cellPhone</th>
                            <th scope="col">email</th>
                            <th scope="col">password</th>
                            <th scope="col">zone </th>
                            <th scope="col">type</th>
                            <th scope="col" colSpan="2" className="text-center">actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.rows.map(row => (
                                <tr key={row.id}>
                                    <td>{row.identification}</td>
                                    <td>{row.name}</td>
                                    <td>{new Date(row.birthtDay).toLocaleDateString('es-CO')}</td>
                                    <td>{row.monthBirthtDay}</td>
                                    <td>{row.address}</td>
                                    <td>{row.cellPhone}</td>
                                    <td>{row.email}</td>
                                    <td>{row.password}</td>
                                    <td>{row.zone}</td>
                                    <td>{row.type}</td>
                                    <td className="text-center">
                                        <Button variant="primary" data-id={row.id} onClick={this.openModal}>Editar</Button>
                                    </td>
                                    <td className="text-center">
                                        <Button onClick={this.deleteUser} data-id={row.id} variant="danger">Eliminar</Button>
                                    </td>
                                </tr>   
                            ))
                        }
                    </tbody>
                </Table>
                <Button href='./FormUser' variant="outline-primary">Agregar</Button>

                <Modal show={this.state.showEditModal}>
                    <Modal.Header>
                        <Modal.Title>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormUser props={ {...this.state.editingItem, ...{editing: true} } } closeEdit={this.closeModal}/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }



}

export default withAlert()(Users);
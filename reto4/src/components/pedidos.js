import Table from 'react-bootstrap/Table';
import React from "react";

class Pedidos extends React.Component{
    render(){
        return(
            <>
                <br></br>
                <h2 className="text-center">
                    Pedidos en espera
                </h2>
                <br></br>
                <Table  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col" className='escondido'>id</th>
                            <th scope="col">registerDay</th>
                            <th scope="col">status</th>
                            <th scope="col">salesMan id</th>
                            <th scope="col">salesMan name</th>
                            <th scope="col">salesMan email</th>
                            <th scope="col">Products</th>
                        </tr>
                    </thead>
                    <tbody>
                            <th></th>
                    </tbody>
                </Table>
            </>
        );
    }
}

export default Pedidos;
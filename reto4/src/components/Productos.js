import React from "react";
import Table from 'react-bootstrap/Table';

class Productos extends React.Component{
    render(){
        return(
            <>
                <br></br>
                <h2 className="text-center">
                    Productos en venta  
                </h2>
                <br></br>
                <Table  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col" className='escondido'>id</th>
                            <th scope="col">brand</th>
                            <th scope="col">model</th>
                            <th scope="col">procesor</th>
                            <th scope="col">os</th>
                            <th scope="col">description</th>
                            <th scope="col"> memory</th>
                            <th scope="col">hardDrive</th>
                            <th scope="col">availability </th>
                            <th scope="col">price</th>
                            <th scope="col">quantity</th>
                            <th scope="col">photography</th>
                            <th scope="col">details</th>
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

export default Productos;
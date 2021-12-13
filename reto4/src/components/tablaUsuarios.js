import Table from 'react-bootstrap/Table';
import React from "react";
import "./ocultarId.css";

class Perfiles extends React.Component{
    render(){
        return(
            <>
          
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>

                        <th scope="col">identification</th>
                        <th scope="col">name</th>
                        <th scope="col">birthtDay</th>
                        <th scope="col">monthBirthtDay</th>
                        <th scope="col">address</th>
                        <th scope="col">cellPhone</th>
                        <th scope="col"> email</th>
                        <th scope="col">password</th>
                        <th scope="col">zone </th>
                        <th scope="col">type</th>
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

export default Perfiles;
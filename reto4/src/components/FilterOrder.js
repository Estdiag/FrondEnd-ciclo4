import React from "react";
import Form from "react-bootstrap/Form";
import FiltersContainer from "./FiltersContainer";
import HOST from "../HostConfig";
import { getJson } from "../Requests";

const GET_URL = `${HOST}/user/all`;
// const GET_URL = `;
class Tablastatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };

    this.getFilters = this.getFilters.bind(this);
    this.StatusFilter = this.StatusFilter.bind(this);
    this.IDNameFilter = this.IDNameFilter.bind(this);
    this.onFilterApply = props.onFilterApply;
    this.getUsers();
   
  }

  getFilters() {
    
    return [this.StatusFilter, this.IDNameFilter];
  }
  
  render() {
    return (
      <FiltersContainer
        availableFilters={this.getFilters()}
        onFilterApply={this.onFilterApply}
      />
    )
  }

  StatusFilter(onFilterChange) {
    return (
      <>
        
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="col-md-5 mx-auto">
            <Form.Label>Filtar por Estado</Form.Label>
            <Form.Select onChange={onFilterChange("Estado")}>
              <option selected disabled value="">
                Selecciona el estado de tu pedido
              </option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
            </Form.Select>
          </Form.Group>
        </Form>
        <br/>
      </>
    );
  }
    async getUsers() {

      let users = await getJson(GET_URL);
      let rows = [];
      Object.values(users).map((row) => rows.push(row));
      this.setState({ rows: rows });
    }
    IDNameFilter(onFilterChange) {
      return (
          <>
          <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="col-md-5 mx-auto">
            <Form.Label>Elija a la perona</Form.Label>
            <Form.Select onChange={onFilterChange("IDName")}>
              <option selected disabled value="">
                Selecciona la perona
              </option>
              {this.state.rows.map((row) => {
                return (
                  <option key={row.id} value={row.id}>
                    {" "}
                    {row.name}{" "}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Form>
          </>
        
      );
    }
}
export default Tablastatus;
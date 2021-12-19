import React from "react";
import Form from "react-bootstrap/Form";
import FiltersContainer from "./FiltersContainer";
import HOST from "../HostConfig";
import { getJson } from "../Requests";

const GET_URL = `${HOST}/user/all`;
// const GET_URL = `;
class FilterOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      filtersValue: {}
    };

    this.getFilters = this.getFilters.bind(this);
    this.StatusFilter = this.StatusFilter.bind(this);
    this.onFilterApply = props.onFilterApply;
    this.getUsers();
  
  }

  getFilters() {
    
    return [this.StatusFilter];
  }
  
  render() {
    return (
      <FiltersContainer
        availableFilters={this.getFilters()}
        onFilterApply={this.onFilterApply}
      />
    )
  }

  buildValue = (valueName, callback) => (event) =>{
    let filtersValue = this.state.filtersValue;
    filtersValue[valueName] = event.target.value;
    this.setState({filtersValue});
    let newEvent = new CustomEvent('statusFilter', { detail: filtersValue });
    callback("Estado")(newEvent);
  }

  StatusFilter(onFilterChange) {
    return (
      <>
        
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="col-md-5 mx-auto">
            <Form.Label>Filtar por Estado</Form.Label>
            <Form.Select onChange={this.buildValue("Estado", onFilterChange)}>
              <option selected disabled value="">
                Selecciona el estado de tu pedido
              </option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-md-5 mx-auto">
            <Form.Label>Elija a la perona</Form.Label>
            <Form.Select onChange={this.buildValue("IDName", onFilterChange)}>
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
}
export default FilterOrder;
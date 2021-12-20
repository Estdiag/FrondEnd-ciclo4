import React from "react";
import Form from "react-bootstrap/Form";
import FiltersContainer from "./FiltersContainer";

class UserFilters extends React.Component {
    constructor(props){
        super(props)

        this.getFilters = this.getFilters.bind(this);
        this.birthDayFilter = this.birthDayFilter.bind(this);
        this.onFilterApply = props.onFilterApply;
    }

    getFilters(){
        return [
            this.birthDayFilter
        ];
    }

    render() {
        return (
            <FiltersContainer availableFilters={this.getFilters()} onFilterApply={this.onFilterApply}/>
        )
    }

    birthDayFilter(onFilterChange) {
        return (
            <>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="col-md-5 mx-auto">
                        <Form.Label>Mes de nacimiento</Form.Label>
                        <Form.Select onChange={onFilterChange('Cumpleaños')}>
                            <option selected disabled value="">Selecciona un Mes</option>
                            <option value="1">Enero</option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
                <br />
            </>
        );
    }
}


export default UserFilters;

import React from "react";
import Form from "react-bootstrap/Form";
import FiltersContainer from "./FiltersContainer";

class LaptopFilters extends React.Component {
    constructor(props){
        super(props)

        this.getFilters = this.getFilters.bind(this);
        this.descriptionFilter = this.descriptionFilter.bind(this);
        this.priceFilter = this.priceFilter.bind(this);
        
        this.onFilterApply = props.onFilterApply;
    }

    getFilters(){
        return [
            this.descriptionFilter,
            this.priceFilter
        ];
    }

    render() {
        return (
            <FiltersContainer availableFilters={this.getFilters()} onFilterApply={this.onFilterApply}/>
        )
    }

    descriptionFilter(onFilterChange){
        return (
            <>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="col-md-5 mx-auto">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" onChange={onFilterChange('Descripción')} />
                    </Form.Group>
                </Form>
                <br />
            </>
        );
    }

    priceFilter(onFilterChange) {
        return (
            <>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="col-md-5 mx-auto">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="number" min="1" deaultValue="0" onChange={onFilterChange('Precio')} />
                    </Form.Group>
                </Form>
                <br />
            </>
        );
    }
}


export default LaptopFilters;

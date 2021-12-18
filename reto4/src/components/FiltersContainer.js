import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { withAlert } from "react-alert";


class FiltersContainer extends React.Component {
    constructor(props) {
        super(props);

        let availableFilters = props.availableFilters || [];

        this.state = {
            activeFilters: [],
            availableFilters,
            showFilters: false
        }

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.applyFilters = this.applyFilters.bind(this);
        this.onFilterApply = props.onFilterApply;
    }

    handleFilterChange = (filterName) => (event) => {
        let activeFilters = this.state.activeFilters;
        let value = event.target.value;
        if(!activeFilters.some(f => f.filterName === filterName))
            activeFilters.push({filterName, value});
        else {
            let index = activeFilters.findIndex(f => f.filterName === filterName);
            activeFilters[index] = {filterName, value};
        }

        if( value === "" || value === null || value === undefined || isNaN(value) ){
            let removeIndex = activeFilters.findIndex(f => f.filterName === filterName);
            activeFilters.pop(removeIndex);
        }
        
        this.setState( {activeFilters: activeFilters});
    }

    applyFilters(){
        const alert = this.props.alert;
        if(this.state.activeFilters.length > 1){
            alert.error("Solo se puede tener un filtro activo");
            return;
        }
        
        this.onFilterApply(this.state.activeFilters[0]);
        this.closeModal();
    }

    openModal(){
        this.setState({showFilters: true, activeFilters: []});
    }   

    closeModal(){
        this.setState({showFilters: false});
    }

    render() {
        return (
            <>
                <Nav className="justify-content-end">
                    {
                        this.state.activeFilters.map(item => (
                            <Nav.Item>
                                <Badge bg="primary">{item.filterName+": "+item.value}</Badge>
                            </Nav.Item>
                        ))
                    }
                    <Button variant="outline-secondary" onClick={this.openModal}>
                        {
                            this.state.activeFilters.length > 0 ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                                </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                                </svg>
                        }
                    </Button>
                </Nav>

                <Modal show={this.state.showFilters}>
                    <Modal.Header>
                        <Modal.Title>Filtrar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.availableFilters.map(filter => (filter(this.handleFilterChange)))
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.applyFilters}>Aplicar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default withAlert()(FiltersContainer);

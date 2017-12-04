import React from 'react';
import {connect} from 'react-redux';
import {Col, FormControl, FormGroup, InputGroup, Row} from 'react-bootstrap';
import trans from '../../translator'
import * as Action from "../../actions";

class Participant extends React.Component {

    constructor() {
        super()
        this.changeSearch = this.changeSearch.bind(this)
        this.search = this.search.bind(this)
    }

    search() {
        this.props.dispatch({
            type: Action.FETCH_PARTICIPANTS_REQUEST
        })
    }

    changeSearch(e) {
        const val = e.target.value ? e.target.value.replace(/^[^0-9]$/i, '') : null;

        this.props.dispatch({
            type: Action.PARTICIPANT_SEARCH_CHANGED,
            payload: val
        })
    }

    renderContent() {
        const {collection, isLoaded, isLoading} = this.props.Participation

        if (isLoading) {
            return <div className="banner">
                <h4>Loading...</h4>
            </div>
        }

        if (isLoaded && collection.length === 0) {
            return <div className="banner">
                <h3>No participants found title</h3>
                <h4>No participants found footer</h4>
            </div>
        }

        return <Col xs={12}>
            <table className="table table-condensed">
                <thead>
                <tr>
                    <td>Edrpou</td>
                    <td>Region</td>
                    <td>Name</td>
                    <td>City</td>
                    <td>Address</td>
                    <td>Count</td>
                </tr>
                </thead>
                <tbody>
                {collection.map(item => <tr key={item.id}>
                    <td>{item.okpo}</td>
                    <td>{item.address.region}</td>
                    <td>{item.name + " " + item.number}</td>
                    <td>{item.address.city}</td>
                    <td>{item.address.street}</td>
                    <td>{item.count}</td>
                </tr>)}
                </tbody>
            </table>
        </Col>
    }

    render() {
        const {search, isLoading} = this.props.Participation

        return <Row>
            <Col xs={12}>
                <Row>
                    <Col xs={12} sm={10} smOffset={1} md={6} mdOffset={3} lg={6} lgOffset={3}>
                        <FormGroup>
                            <InputGroup>
                                <FormControl
                                    placeholder={trans('contact_field_name')}
                                    value={search || ''}
                                    onChange={this.changeSearch}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-lg"
                                            onClick={this.search}
                                            disabled={isLoading}>
                                        {isLoading
                                            ? <i className="fa fa-spin fa-circle-o-notch"/>
                                            : <i className="fa fa-search"/>}&nbsp;Пошук
                                    </button>
                                </span>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    {this.renderContent()}
                </Row>
            </Col>
        </Row>
    }
}

export default connect(store => store)(Participant)
import React from 'react';
import {connect} from 'react-redux';
import {Col, FormControl, FormGroup, InputGroup, Row} from 'react-bootstrap';
import trans from '../../translator'
import * as Action from "../../actions";

class Pharmacy extends React.Component {

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
        const val = e.target.value;

        this.props.dispatch({
            type: Action.PARTICIPANT_SEARCH_CHANGED,
            payload: val
        })
    }

    renderContent() {
        const {collection, isLoaded, isLoading} = this.props.Participation

        if (isLoading) {
            return <div className="banner">
                <h4>{trans('participation_loading')}</h4>
            </div>
        }

        if (isLoaded && collection.length === 0) {
            return <div className="banner">
                <h3>{trans('participation_no_items_title')}</h3>
                <h4>{trans('participation_no_items_footer')}</h4>
            </div>
        }

        return <Col xs={12}>
            <div className="table-scrollable">
                <table className="table table-condensed table-hover">
                    <thead>
                    <tr>
                        <th>{trans('participation_region')}</th>
                        <th>{trans('participation_name')}</th>
                        <th>{trans('participation_city')}</th>
                        <th>{trans('participation_address')}</th>
                        <th>{trans('participation_event_codes')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {collection.map(item => <tr key={item.id}>
                        <td>{item.address.region.name}</td>
                        <td>{item.name + (item.number ? " (" + item.number + ")" : "")}</td>
                        <td>{item.address.city}</td>
                        <td>{item.address.street}</td>
                        <td className="text-center">{item.eventCodesAmount}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="alert alert-warning">
                <p><i className="fa fa-info-circle"/>&nbsp;{trans('participation_notice')}</p>
            </div>
        </Col>
    }

    render() {
        const {okpo, isLoading} = this.props.Participation

        return <Row>
            <Col xs={12}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <InputGroup>
                                <FormControl
                                    placeholder={trans('participation_search_placeholder')}
                                    value={okpo || ''}
                                    onChange={this.changeSearch}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-lg"
                                            onClick={this.search}
                                            disabled={isLoading || !okpo}>
                                        {isLoading
                                            ? <i className="fa fa-spin fa-circle-o-notch"/>
                                            : <i className="fa fa-search"/>}&nbsp;{trans('participation_search_btn')}
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

export default connect(store => store)(Pharmacy)
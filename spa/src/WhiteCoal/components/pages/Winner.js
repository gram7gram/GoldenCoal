import React from 'react';
import {connect} from 'react-redux';
import {Col, FormControl, FormGroup, InputGroup, Row} from 'react-bootstrap';
import WinnerContact from './WinnerContact';
import trans from '../../translator'
import * as Action from "../../actions";
import FetchRegions from "../../actions/FetchRegions";

class Winner extends React.Component {

    constructor() {
        super()
        this.changeSearch = this.changeSearch.bind(this)
        this.search = this.search.bind(this)
        this.setRegion = this.setRegion.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(FetchRegions())
        // this.props.dispatch({
        //     type: Action.FETCH_WINNERS_REQUEST
        // })
    }

    setRegion(e) {
        const option = parseInt(e.target.value)
        let payload = null
        if (option) {
            payload = this.props.Region.collection
                .find(item => item.id === option)
        }
        this.props.dispatch({
            type: Action.WINNER_REGION_CHANGED,
            payload
        })
    }

    search() {
        this.props.dispatch({
            type: Action.FETCH_WINNERS_REQUEST
        })
    }

    changeSearch(e) {
        const val = e.target.value;

        this.props.dispatch({
            type: Action.WINNER_SEARCH_CHANGED,
            payload: val
        })
    }

    enableContactForm(id, winners) {

        this.props.dispatch({
            type: Action.WINNER_ENABLE_CONTACT_FORM,
            payload: {
                pharmacies: winners.map(winner => winner.pharmacy),
                event: {
                    id: this.props.Winner.event.id
                },
                prize: {
                    id
                }
            }
        })
    }

    renderContent() {
        const {collection, isLoaded, isLoading, prizes, isFirstSearch} = this.props.Winner
        const {isVisible, model} = this.props.WinnerContact

        if (isLoading) {
            return <div className="banner">
                <h4>{trans('participation_loading')}</h4>
            </div>
        }

        if (isLoaded && prizes.length === 0) {

            if (isFirstSearch) {
                return <div className="banner">
                    <h3>{trans('participation_first_search_title')}</h3>
                </div>
            }
            return <div className="banner">
                <h3>{trans('winner_no_items_title')}</h3>
                <h4>{trans('winner_no_items_footer')}</h4>
            </div>
        }

        const pharmacyRegistry = {}

        collection.forEach(item => {
            if (pharmacyRegistry[item.prize.id] === undefined) {
                pharmacyRegistry[item.prize.id] = []
            }

            pharmacyRegistry[item.prize.id].push(item)
        })

        return <Col xs={12}>
            {prizes.map(prize => {
                const winners = pharmacyRegistry[prize.id] !== undefined ? pharmacyRegistry[prize.id] : []
                return <Row key={prize.id}>
                    <Col xs={12}>
                        <h3>{prize.name}</h3>
                    </Col>
                    <Col xs={12} sm={4} md={3} lg={2}>
                        <img src={prize.image} alt={prize.name}
                             className="img-responsive auto-margin prize-image"/>
                    </Col>
                    <Col xs={12} sm={8} md={9} lg={10}>
                        {
                            winners.length === 0 ?
                                <div className="banner">
                                    <h3>{trans('no_winner_for_prize_title')}</h3>
                                    <h4>{trans('winner_no_items_footer')}</h4>
                                </div>
                                : <div className="table-scrollable">
                                    <table className="table table-condensed table-hover">
                                        <thead>
                                        <tr>
                                            <th>{trans('participation_region')}</th>
                                            <th>{trans('participation_name')}</th>
                                            <th>{trans('participation_city')}</th>
                                            <th>{trans('participation_address')}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {winners.map(item => <tr key={item.id}>
                                            <td>{item.pharmacy.address.region.name}</td>
                                            <td>{item.pharmacy.name + (item.pharmacy.number ? " (" + item.pharmacy.number + ")" : "")}</td>
                                            <td>{item.pharmacy.address.city}</td>
                                            <td>{item.pharmacy.address.street}</td>
                                        </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </Col>
                    <Col xs={12}>
                        <div className="banner">
                            <h3>{trans('winner_request_title')}</h3>
                            <h4>{trans('winner_request_footer')}</h4>
                            <h4 className="bold">{prize.name}</h4>

                            {isVisible && model.prize.id === prize.id ? <WinnerContact/> :
                                <button className="btn btn-primary"
                                        disabled={winners.length === 0}
                                        onClick={this.enableContactForm.bind(this, prize.id, winners)}>
                                    {trans('request_prize_btn')}
                                </button>}
                        </div>
                    </Col>
                </Row>
            })}
        </Col>
    }

    render() {
        const {region, isLoading} = this.props.Winner

        const isValid = region && region.id

        return <Row>
            <Col xs={12}>
                <Row>
                    <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
                        <FormGroup>
                            <InputGroup>
                                <select
                                    className={"form-control"}
                                    value={region ? region.id : ''}
                                    onChange={this.setRegion}>
                                    <option value={''}>{trans('participation_search_placeholder')}</option>
                                    {this.props.Region.collection.map((item, key) =>
                                        <option key={key} value={item.id}>{item.name}</option>
                                    )}
                                </select>
                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-lg"
                                            onClick={this.search}
                                            disabled={isLoading || !isValid}>
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

export default connect(store => store)(Winner)
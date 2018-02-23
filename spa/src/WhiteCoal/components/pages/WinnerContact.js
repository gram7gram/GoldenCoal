import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, FormControl, Row, Col} from 'react-bootstrap';
import trans from '../../translator'
import SendAction from '../../actions/WinnerContact'
import * as Action from '../../actions'
import validator from 'email-validator'

class WinnerContact extends React.Component {

    constructor() {
        super()
        this.submit = this.submit.bind(this)
        this.cancel = this.cancel.bind(this)
        this.setPharmacy = this.setPharmacy.bind(this)
    }

    submit() {
        this.props.dispatch(SendAction(this.props.WinnerContact.model))
    }

    setPharmacy(e) {
        const option = parseInt(e.target.value)
        let pharmacy = null
        if (option) {
            pharmacy = this.props.WinnerContact.pharmacies
                .find(item => item.id === option)
        }
        this.props.dispatch({
            type: Action.WINNER_CONTACT_CHANGED,
            payload: {
                pharmacy
            }
        })
    }

    cancel() {
        this.props.dispatch({
            type: Action.WINNER_DISABLE_CONTACT_FORM,
        })
    }

    change(field) {
        return (e) => {
            this.props.dispatch({
                type: Action.WINNER_CONTACT_CHANGED,
                payload: {
                    [field]: e.target.value
                }
            })
        }
    }

    render() {
        const {model, isContacted, isLoading} = this.props.WinnerContact

        if (isContacted) {
            return <div className="banner">
                <h3>Лист було успішно надіслано</h3>
                <h4>Очікуйте на відповідь та приз</h4>
            </div>
        }

        const canSend = model.lastName && model.lastName.length > 2
            && model.firstName && model.firstName.length > 2
            && model.phone && model.phone.length >= 10
            && model.email && validator.validate(model.email)
            && model.destination
            && model.city && model.city.length > 2
            && model.pharmacy && model.pharmacy.id

        return <Row className="text-left">
            <Col xs={12} sm={8} smOffset={2} md={8} mdOffset={2} lg={6} lgOffset={3}>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                            <label className="required">{trans('contact_field_lastName')}</label>
                            <FormControl
                                placeholder={trans('generic_text_placeholder')}
                                value={model.lastName || ''}
                                onChange={this.change('lastName')}/>
                        </FormGroup>
                        <FormGroup>
                            <label className="required">{trans('contact_field_firstName')}</label>
                            <FormControl
                                placeholder={trans('generic_text_placeholder')}
                                value={model.firstName || ''}
                                onChange={this.change('firstName')}/>
                        </FormGroup>

                        <FormGroup>
                            <label className="required">{trans('winner_request_email')}</label>
                            <FormControl
                                placeholder={trans('generic_text_placeholder')}
                                value={model.email || ''}
                                onChange={this.change('email')}/>
                        </FormGroup>

                        <FormGroup>
                            <label className="required">{trans('field_pharmacy')}</label>
                            <select
                                className={"form-control"}
                                value={model.pharmacy ? model.pharmacy.id : ''}
                                onChange={this.setPharmacy}>
                                <option value={''}>{trans('generic_select_placeholder')}</option>
                                {this.props.WinnerContact.pharmacies.map((item, key) =>
                                    <option key={key} value={item.id}>
                                        {item.address.region.name}, {item.name}, {item.address.city || ''}, {item.address.street || ''}
                                    </option>
                                )}
                            </select>
                        </FormGroup>

                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <FormGroup>
                            <label className="required">{trans('contact_field_phone')}</label>
                            <FormControl
                                placeholder={trans('generic_text_placeholder')}
                                value={model.phone || ''}
                                onChange={this.change('phone')}/>
                        </FormGroup>

                        <FormGroup>
                            <label className="required">{trans('contact_field_destination')}</label>
                            <FormControl
                                placeholder={trans('generic_text_placeholder')}
                                value={model.destination || ''}
                                onChange={this.change('destination')}/>
                        </FormGroup>

                        <FormGroup>
                            <label className="required">{trans('contact_field_city')}</label>
                            <FormControl
                                placeholder={trans('generic_text_placeholder')}
                                value={model.city || ''}
                                onChange={this.change('city')}/>
                        </FormGroup>

                        <FormGroup>
                            <label>{trans('winner_request_comment')}</label>
                            <textarea
                                className="form-control"
                                placeholder={trans('generic_text_placeholder')}
                                value={model.comment || ''}
                                onChange={this.change('comment')}/>
                        </FormGroup>
                    </Col>
                </Row>

                <FormGroup className="text-center">
                    <button className="btn btn-primary"
                            disabled={!canSend || isLoading}
                            onClick={this.submit}>Відправити
                    </button>
                    <button className="btn btn-default"
                            onClick={this.cancel}>Відмінити
                    </button>
                </FormGroup>
            </Col>
        </Row>
    }
}

export default connect(store => store)(WinnerContact)
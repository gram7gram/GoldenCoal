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
        const {model, isContacted} = this.props.WinnerContact

        if (isContacted) {
            return <div className="banner">
                <h3>Лист було успішно надіслано</h3>
                <h4>Очікуйте на відповідь та приз</h4>
            </div>
        }

        const canSend = model.name && model.name.length > 3
            && model.email && validator.validate(model.email)
            && model.pharmacy && model.pharmacy.id

        return <Row>
            <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
                <FormGroup>
                    <FormControl
                        placeholder={trans('contact_field_name')}
                        value={model.name || ''}
                        onChange={this.change('name')}/>
                </FormGroup>

                <FormGroup>
                    <FormControl
                        placeholder={trans('contact_field_email')}
                        value={model.email || ''}
                        onChange={this.change('email')}/>
                </FormGroup>

                <FormGroup>
                    <select
                        className={"form-control"}
                        value={model.pharmacy ? model.pharmacy.id : ''}
                        onChange={this.setPharmacy}>
                        <option value={''}>{trans('field_pharmacy')}</option>
                        {this.props.WinnerContact.pharmacies.map((item, key) =>
                            <option key={key} value={item.id}>
                                {item.address.region.name}, {item.name}, {item.address.city || ''}, {item.address.street || ''}
                            </option>
                        )}
                    </select>
                </FormGroup>

                <FormGroup>
                        <textarea
                            className="form-control"
                            placeholder={trans('winner_request_comment')}
                            value={model.content || ''}
                            onChange={this.change('content')}/>
                </FormGroup>

                <FormGroup className="text-center">
                    <button className="btn btn-primary"
                            disabled={!canSend}
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
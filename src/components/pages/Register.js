import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, Row, Col, Alert, Button, HelpBlock} from 'react-bootstrap';
import Map from '../Map'

import changeAction from '../../actions/Change'
import participateAction from '../../actions/Participate'
import IncrementStep from '../../actions/IncrementStep'
import DecrementStep from '../../actions/DecrementStep'

import trans from '../../translator'

class Register extends React.Component {

    constructor() {
        super()
        this.submit = this.submit.bind(this)
        this.nextStep = this.nextStep.bind(this)
        this.prevStep = this.prevStep.bind(this)
    }

    submit() {
        const model = this.props.Participant.model
        this.props.dispatch(participateAction(model))
    }

    change(field) {
        return (e) => {
            this.props.dispatch(changeAction({
                [field]: e.target.value
            }))
        }
    }

    nextStep() {
        this.props.dispatch(IncrementStep())
    }

    prevStep() {
        this.props.dispatch(DecrementStep())
    }

    renderSimpleText(name) {
        const {model} = this.props.Participant
        return <FormGroup>
            <input
                type="text"
                name={name}
                placeholder={trans('field_' + name)}
                value={model[name] || ''}
                onChange={this.change(name)}/>
        </FormGroup>
    }

    renderSteps() {
        const {step, model} = this.props.Participant

        switch (step) {
            case 1:
                return <div className="step active">
                    {this.renderSimpleText('firstName')}
                    {this.renderSimpleText('lastName')}
                    {this.renderSimpleText('middleName')}
                    <FormGroup>
                        <input type="text"
                               name="phone"
                               placeholder={trans('field_phone')}
                               value={model.phone || ''}
                               onChange={this.change("phone")}/>
                    </FormGroup>
                    <FormGroup>
                        <input type="text"
                               name="email"
                               placeholder={trans('field_email')}
                               value={model.email || ''}
                               onChange={this.change("email")}/>
                        <HelpBlock>{trans('field_email_notice')}</HelpBlock>
                    </FormGroup>
                </div>
            case 2:
                return <div className="step active">
                    {this.renderSimpleText('legalName')}
                    {this.renderSimpleText('company')}
                    {this.renderSimpleText('pharmacyType')}
                    {this.renderSimpleText('pharmacyName')}
                    {this.renderSimpleText('pharmacyNumber')}
                    {this.renderSimpleText('position')}
                </div>
            case 3:
                return <div className="step active">
                    {this.renderSimpleText('region')}
                    {this.renderSimpleText('city')}
                    {this.renderSimpleText('address')}
                    <FormGroup>
                        <Map/>
                    </FormGroup>
                </div>
            default:
                return null

        }
    }

    render() {
        const {validator, step} = this.props.Participant
        const canGoToNext = step < 3
        const canGoToPrev = step > 1
        const canShowSubmit = step === 3

        return <Row>

            {
                !validator.isValid ?
                    <Col xs={12}>
                        <Alert bsStyle="danger">
                            <p>{trans('validation_generic_title')}</p>
                            <ul>{validator.errors.map((e, key) => <li key={key}>{e}</li>)}</ul>
                        </Alert>
                    </Col> : null
            }

            <Col xs={12}>

                <div className="step-navigation">
                    <ul className="steps">
                        <li className={step === 1 ? "active" : null}>{trans('register_step_1')}</li>
                        <li className={step === 2 ? "active" : null}>{trans('register_step_2')}</li>
                        <li className={step === 3 ? "active" : null}>{trans('register_step_3')}</li>
                    </ul>

                    <div className="step-content page-container">

                        {this.renderSteps()}

                        <FormGroup>
                            {canShowSubmit ?
                                <Button bsStyle="primary"
                                        onClick={this.submit}
                                        disabled={!validator.canParticipate}>Submit</Button>
                                : null}
                            {canGoToPrev ?
                                <Button bsStyle="primary"
                                        onClick={this.prevStep}>{'< Prev'}</Button>
                                : null}
                            {canGoToNext ?
                                <Button bsStyle="primary"
                                        onClick={this.nextStep}>{'Next >'}</Button>
                                : null}
                        </FormGroup>
                    </div>
                </div>


            </Col>
        </Row>
    }
}

export default connect(store => store)(Register)
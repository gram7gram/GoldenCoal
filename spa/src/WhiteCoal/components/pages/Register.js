import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, FormControl, Row, Col, Alert, Button} from 'react-bootstrap';

import changeAction from '../../actions/Change'
import participateAction from '../../actions/Participate'
import IncrementStep from '../../actions/IncrementStep'
import DecrementStep from '../../actions/DecrementStep'
import positionChanged from '../../actions/PositionChanged'
import pharmacyChanged from '../../actions/PharmacyChanged'
import regionChanged from '../../actions/RegionChanged'

import trans from '../../translator'

class Register extends React.Component {

    constructor() {
        super()
        this.submit = this.submit.bind(this)
        this.nextStep = this.nextStep.bind(this)
        this.prevStep = this.prevStep.bind(this)
        this.setPharmacyType = this.setPharmacyType.bind(this)
        this.setPosition = this.setPosition.bind(this)
        this.setRegion = this.setRegion.bind(this)
        this.getValidationState = this.getValidationState.bind(this)
        this.confirm = this.confirm.bind(this)
    }

    setRegion(e) {
        const option = parseInt(e.target.value)
        let item = null
        if (option) {
            item = this.props.Region.collection
                .find(item => item.id === option)
        }
        this.props.dispatch(regionChanged(item))
    }

    setPosition(e) {
        const option = parseInt(e.target.value)
        let item = null
        if (option) {
            item = this.props.Position.collection
                .find(item => item.id === option)
        }
        this.props.dispatch(positionChanged(item))
    }

    setPharmacyType(e) {
        const option = parseInt(e.target.value)
        let item = null
        if (option) {
            item = this.props.Pharmacy.collection
                .find(item => item.id === option)
        }
        this.props.dispatch(pharmacyChanged(item))
    }

    submit() {
        const model = this.props.Participant.model
        this.props.dispatch(participateAction(model))
    }

    confirm(e) {
        this.props.dispatch(changeAction({
            isConfirmed: e.target.checked
        }))
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

    getValidationState(name) {
        const {changes, validator} = this.props.Participant
        let state = null
        if (changes[name] === true) {
            if (validator.errors.field[name] === true) {
                state = 'error'
            } else {
                state = 'success'
            }
        }
        return state;
    }

    renderSimpleText(name) {
        const {model} = this.props.Participant

        return <FormGroup validationState={this.getValidationState(name)}>
            <label>{trans('field_' + name)}</label>
            <FormControl
                placeholder={trans('enter_placeholder')}
                value={model[name] || ''}
                onChange={this.change(name)}/>
        </FormGroup>
    }

    renderSteps() {
        const {step, model} = this.props.Participant

        switch (step) {
            case 1:
                return <div className="step active">
                    {this.renderErrors()}
                    {this.renderSimpleText('firstName')}
                    {this.renderSimpleText('lastName')}
                    <FormGroup validationState={this.getValidationState("email")}>
                        <label>{trans('field_email')}</label>
                        <FormControl
                            placeholder={trans('enter_placeholder')}
                            value={model.email || ''}
                            onChange={this.change("email")}/>
                    </FormGroup>
                </div>
            case 2:
                return <div className="step active">
                    {this.renderErrors()}
                    {this.renderSimpleText('legalName')}
                    <FormGroup validationState={this.getValidationState("pharmacyEdrpou")}>
                        <label>{trans('field_pharmacyEdrpou')}</label>
                        <FormControl
                            placeholder={trans('enter_placeholder')}
                            value={model.pharmacy.edrpou || ''}
                            onChange={this.change("pharmacyEdrpou")}/>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState("pharmacyType")}>
                        <label>{trans('field_pharmacyType')}</label>
                        <select
                            className={"form-control"}
                            value={model.pharmacy.type ? model.pharmacy.type.id : ''}
                            onChange={this.setPharmacyType}>
                            <option value={''}>{trans('select_placeholder')}</option>
                            {this.props.Pharmacy.collection.map((item, key) =>
                                <option key={key} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState("pharmacyName")}>
                        <label>{trans('field_pharmacyName')}</label>
                        <FormControl
                            placeholder={trans('enter_placeholder')}
                            value={model.pharmacy.name || ''}
                            onChange={this.change("pharmacyName")}/>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState("pharmacyNumber")}>
                        <label>{trans('field_pharmacyNumber')}</label>
                        <FormControl
                            placeholder={trans('enter_placeholder')}
                            value={model.pharmacy.number || ''}
                            onChange={this.change("pharmacyNumber")}/>
                    </FormGroup>
                    <FormGroup validationState={this.getValidationState("position")}>
                        <label>{trans('field_position')}</label>
                        <select
                            className={"form-control"}
                            value={model.position ? model.position.id : ''}
                            onChange={this.setPosition}>
                            <option value={''}>{trans('select_placeholder')}</option>
                            {this.props.Position.collection.map((item, key) =>
                                <option key={key} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </FormGroup>
                </div>
            case 3:
                return <div className="step active">
                    {this.renderErrors()}

                    <FormGroup validationState={this.getValidationState("region")}>
                        <label>{trans('field_region')}</label>
                        <select
                            className={"form-control"}
                            value={model.address.region ? model.address.region.id : ''}
                            onChange={this.setRegion}>
                            <option value={''}>{trans('select_placeholder')}</option>
                            {this.props.Region.collection.map((item, key) =>
                                <option key={key} value={item.id}>{item.name}</option>
                            )}
                        </select>
                    </FormGroup>

                    <FormGroup validationState={this.getValidationState("city")}>
                        <label>{trans('field_city')}</label>
                        <FormControl
                            placeholder={trans('enter_placeholder')}
                            value={model.address.city || ''}
                            onChange={this.change("city")}/>
                    </FormGroup>

                    <FormGroup validationState={this.getValidationState("street")}>
                        <label>{trans('field_street')}</label>
                        <FormControl
                            placeholder={trans('enter_placeholder')}
                            value={model.address.street || ''}
                            onChange={this.change("street")}/>
                    </FormGroup>
                    <FormGroup>
                        <label>
                            <input type="checkbox"
                                   onChange={this.confirm}
                                   checked={model.isConfirmed}/>&nbsp;Заповнюючи цю анкету, я даю свою згоду на збір,
                            реєстрацію, зберігання, адаптацію,
                            зміну, оновлення моїх персональних даних (з використанням інформаційних систем і без
                            них) без обмежень такої обробки. Дана згода на збір і обробку моїх персональних даних,
                            поширюється на всі дані, зазначені мною в цій анкеті.
                        </label>
                    </FormGroup>
                </div>
            default:
                return null

        }
    }

    renderErrors() {
        const {validator} = this.props.Participant

        if (validator.isValid) return null

        return <Row>
            <Col xs={12}>
                <Alert bsStyle="danger">
                    <p>{trans('validation_generic_title')}</p>
                    <ul>{validator.errors.messages.map((e, key) => <li key={key}>{e}</li>)}</ul>
                </Alert>
            </Col>
        </Row>
    }

    render() {
        const {validator, step, isRegistered, isLoading} = this.props.Participant
        const canGoToNext = step < 3
        const canGoToPrev = step > 1
        const canShowSubmit = step === 3

        return <Row>

            <Col xs={12}>

                <div className="page-container">
                    <div className="step-navigation">
                        <ul className="steps text-center">
                            <li className={step === 1 ? "active" : null}>
                                <span>{trans('register_step_1')}</span></li>
                            <li className={step === 2 ? "active" : null}>
                                <span>{trans('register_step_2')}</span></li>
                            <li className={step === 3 ? "active" : null}>
                                <span>{trans('register_step_3')}</span>
                            </li>
                        </ul>

                        <div className="step-content">

                            {isRegistered
                                ? <div className="banner">
                                    <h3>Дякуємо за Ваш інтерес до акції</h3>
                                    <h4>БІЛИЙ IPAD ВІД БІЛОГО ВУГІЛЛЯ!</h4>
                                    <a href={RegisterRouter.GET.index} className="btn btn-primary">На головну</a>
                                </div>
                                : this.renderSteps()}

                            {!isRegistered ? <FormGroup className="action-container">
                                {canShowSubmit ?
                                    <Button bsStyle="primary"
                                            className="pull-right"
                                            onClick={this.submit}
                                            disabled={!validator.canParticipate || isLoading}>
                                        {!isLoading
                                            ? <i className="fa fa-check"/>
                                            : <i className="fa fa-spin fa-circle-o-notch"/>}
                                        &nbsp;Відправити анкету
                                    </Button>
                                    : null}
                                {canGoToPrev ?
                                    <Button bsStyle="primary"
                                            className="pull-left"
                                            onClick={this.prevStep}
                                            disabled={isLoading}>
                                        <i className="fa fa-arrow-left"/>&nbsp;Назад
                                    </Button>
                                    : null}
                                {canGoToNext ?
                                    <Button bsStyle="primary"
                                            className="pull-right"
                                            onClick={this.nextStep}
                                            disabled={isLoading}>
                                        Далі&nbsp;<i className="fa fa-arrow-right"/>
                                    </Button>
                                    : null}
                            </FormGroup> : null}
                        </div>
                    </div>
                </div>


            </Col>
        </Row>
    }
}

export default connect(store => store)(Register)
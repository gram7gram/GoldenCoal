import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, FormControl,Row, Col} from 'react-bootstrap';
import trans from '../../translator'
import changeAction from '../../actions/Contact/Change'
import SendAction from '../../actions/Contact/Send'
import validator from 'email-validator'

class About extends React.Component {


    constructor() {
        super()
        this.submit = this.submit.bind(this)
    }

    submit() {
        this.props.dispatch(SendAction(this.props.Contact.model))
    }

    change(field) {
        return (e) => {
            this.props.dispatch(changeAction({
                [field]: e.target.value
            }))
        }
    }

    render() {
        const {model, isContacted} = this.props.Contact

        if (isContacted) {
            return <div className="page-container contact-container">
                <div className="banner">
                    <h3>Лист було успішно надіслано</h3>
                    <h4>Очікуйте на відповідь</h4>
                </div>
            </div>
        }

        const canSend = model.name && model.name.length > 3
            && model.email && validator.validate(model.email)
            && model.content && model.content.length > 3

        return <div className="page-container contact-container">
            <h2 className="contact-title">Задати питання</h2>
            <h3 className="contact-subtitle">Заповніть поля форми на натисніть Відправити</h3>


            <Row>
                <Col xs={12}>
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
                        <textarea
                            className="form-control"
                            placeholder={trans('contact_field_content')}
                            value={model.content || ''}
                            onChange={this.change('content')}/>
                    </FormGroup>

                    <FormGroup className="text-center">
                        <button className="btn btn-primary"
                           disabled={!canSend}
                           onClick={this.submit}>Відправити</button>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    }
}

export default connect(store => store)(About)
import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, Row, Col} from 'react-bootstrap';
import trans from '../../translator'

class About extends React.Component {


    constructor() {
        super()
        this.submit = this.submit.bind(this)
    }

    submit() {
    }

    change(field) {
        return (e) => {
            this.props.dispatch(changeAction({
                [field]: e.target.value
            }))
        }
    }

    render() {
        const {model} = this.props.Participant

        return <div className="page-container contact-container">
            <h2 className="contact-title">Зворотній зв'язок</h2>
            <h3 className="contact-subtitle">Заповніть поля форми на натисніть Відправити</h3>


            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder={trans('contact_field_name')}
                            value={model.name || ''}
                            onChange={this.change('name')}/>
                    </FormGroup>

                    <FormGroup>
                        <input
                            type="text"
                            placeholder={trans('contact_field_email')}
                            value={model.email || ''}
                            onChange={this.change('email')}/>
                    </FormGroup>

                    <FormGroup>
                <textarea
                    placeholder={trans('contact_field_content')}
                    value={model.content || ''}
                    onChange={this.change('content')}/>
                    </FormGroup>

                    <FormGroup className="text-center">
                        <a className="btn btn-primary"
                           onClick={this.submit}>Відправити</a>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    }
}

export default connect(store => store)(About)
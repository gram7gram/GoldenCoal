import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, FormControl, Row, Col, InputGroup, Button} from 'react-bootstrap';
import trans from '../../translator'
import changeAction from '../../actions/Contact/Change'
import SendAction from '../../actions/Contact/Send'
import validator from 'email-validator'

class Participant extends React.Component {


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

        return <Row>
            <Col xs={12}>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            placeholder={trans('contact_field_name')}
                            value={model.name || ''}
                            onChange={this.change('name')}/>
                        <Button>
                            <i className="fa fa-search"/>&nbsp;Пошук
                        </Button>
                    </InputGroup>
                </FormGroup>
            </Col>
        </Row>
    }
}

export default connect(store => store)(Participant)
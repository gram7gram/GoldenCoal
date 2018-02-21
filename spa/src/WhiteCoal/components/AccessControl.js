import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import trans from '../translator'
import * as Action from "../actions";

class AccessControl extends React.Component {

    constructor() {
        super()
        this.changeCode = this.changeCode.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit() {
        const {code} = this.props.Participation

        this.props.dispatch({
            type: Action.PARTICIPANT_CODE_CHECK,
            payload: {
                code
            }
        })
    }

    changeCode(e) {
        let val = parseInt(e.target.value)
        if (isNaN(val) || val < 0) val = 0;

        this.props.dispatch({
            type: Action.PARTICIPANT_CODE_CHANGED,
            payload: val
        })
    }

    render() {
        const {code} = this.props.Participation

        return <Row>
            <Col xs={12}>
                <div className="banner">
                    <h4>{trans('participation_access_title')}</h4>
                    <h5>{trans('participation_access_footer1')}</h5>
                    <h5>{trans('participation_access_footer2')}</h5>

                    <Row>
                        <Col xs={6} xsOffset={3} sm={6} smOffset={3} md={4} mdOffset={4} lg={4} lgOffset={4}>
                            <Row>
                                <Col xs={9}>
                                    <div className="form-group">
                                        <input type="number"
                                               value={code || 0}
                                               onChange={this.changeCode}
                                               className="form-control text-right"/>
                                    </div>

                                </Col>
                                <Col xs={3}>
                                    <div className="text-left">
                                        <label style={{position: 'relative', top: '10px'}}>мг</label>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12}>
                            <div className="form-group">
                                <button type="submit"
                                        onClick={this.submit}
                                        className="btn btn-default">
                                    <i className="fa fa-check"/>&nbsp;{trans('participation_access_submit')}
                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    }
}

export default connect(store => store)(AccessControl)
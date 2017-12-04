import React from "react";
import {Row, Col} from 'react-bootstrap'

export default class Layout extends React.Component {

    render() {
        return <div className="container">{this.props.children}</div>
    }
}
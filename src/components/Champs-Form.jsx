import React, {Component} from "react";
import {Row, Col, Form} from "react-bootstrap";
import '../css/Main-Form.css'


class Champs_Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nomChamps: props.nomChamps,
            nomPlaceHolder: props.nomPlaceHolder
        }
    }

    render() {
        return (
            <Form.Group className="px-lg-0 px-5" as={Row} controlId="formHorizontalText">
                <Form.Label column sm={4}>{this.state.nomChamps}</Form.Label>
                <Col sm={8}>
                    <Form.Control type="text" placeholder={this.state.nomPlaceHolder}/>
                </Col>
            </Form.Group>
        );
    }
}

export default Champs_Form;
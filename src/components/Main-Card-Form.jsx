import React, {Component} from "react";
import {Card, Button, Row, Col, Form} from "react-bootstrap";
import '../css/Main-Form.css'

import Champs_Form from "./Champs-Form";


class Main_Card_Form extends Component{
    constructor(props){
        super(props);

        this.state = {}
    }
    render() {
        return(
            <Card className="my-lg-5 my-md-4 my-sm-4 my-4">
                <Row className="mx-3 my-3 justify-content-between">
                    <Col className="col-lg-4 col-md-6 col-6">
                        <h2 className="title-form">Ajout d'une course</h2>
                    </Col>
                    <Col className="col-lg-4 col-md-6 col-6" id="col-form-button">
                        <Button className="button-form">AJOUTER</Button>
                    </Col>
                </Row>
                <Card className="card-form">
                    <Row className="my-5 justify-content-center">
                        <Col lg={6}>
                            <Form>
                                <Champs_Form nomChamps="DATE" nomPlaceHolder="DD/MM/YYYY"/>
                                <Champs_Form nomChamps="DUREE" nomPlaceHolder="MIN"/>
                                <Champs_Form nomChamps="DISTANCE" nomPlaceHolder="KM"/>
                                <Champs_Form nomChamps="LOCALISATION" nomPlaceHolder="NOM DE LA VILLE"/>
                                <Champs_Form nomChamps="REVENU" nomPlaceHolder="€"/>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Card>
        );
    }
}

export default Main_Card_Form;
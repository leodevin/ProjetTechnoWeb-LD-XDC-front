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
                        <h2 className="title-form">Ajout d'un utilisateur</h2>
                    </Col>
                    <Col className="col-lg-4 col-md-6 col-6" id="col-form-button">
                        <Button className="justify-content-center button-form"><div>AJOUTER</div></Button>
                    </Col>
                </Row>
                <Card className="card-form">
                    <Row className="my-5 justify-content-center">
                        <Col lg={6}>
                            <Form>
                                <Champs_Form nomChamps="ID" nomPlaceHolder="ObjectID"/>
                                <Champs_Form nomChamps="LOCATION" nomPlaceHolder="Pays"/>
                                <Champs_Form nomChamps="PERSONNES DANS LA MAISON" nomPlaceHolder="Nombre"/>
                                <Champs_Form nomChamps="TAILLE DE LA MAISON" nomPlaceHolder="Big/Medium/Small"/>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Card>
        );
    }
}

export default Main_Card_Form;
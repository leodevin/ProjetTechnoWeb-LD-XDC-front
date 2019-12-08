import React, {Component} from "react";
import {Card, Row, Col} from "react-bootstrap";

import '../css/Main-User.css'

class Main_Card_User extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: "none",
            lieu: "none",
            nbrPersonnes: 0,
            taille: "none",
            nbrSensor: 0,
            nbrMeasure: 0
        }
    }

    render() {
        return(
            <Card className="mx-3 p-3 h-100" id="card-user">
                <h2 className="title-user">Profil de l'utilisateur</h2>
                <Row>
                    <Col id="user-left">
                        <Row>
                            <Col>Lieu</Col>
                            <Col className="user-chiffres">{this.state.lieu}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>Personnes</Col>
                            <Col className="user-chiffres">{this.state.nbrPersonnes}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>Taille</Col>
                            <Col className="user-chiffres">{this.state.taille}</Col>
                        </Row>
                        <Row className={"info-importante my-3"}>
                            <Col id={"title-id"}>ID</Col>
                            <Col className="user-chiffres">{this.state.id}</Col>
                        </Row>
                        <br/>
                    </Col>
                    <Col id="user-right">
                        <Card.Title id="capteurs">Capteurs</Card.Title>
                        <Card.Subtitle id="nombre-capteur">{this.state.nbrSensor}</Card.Subtitle>
                        <br/>
                        <Card.Text className="info-importante">{this.state.nbrMeasure} mesures au total</Card.Text>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Main_Card_User;
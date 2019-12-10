import React, {Component} from "react";
import {Card, Row, Col} from "react-bootstrap";

import '../css/Main-User.css'
import axios from "axios";
const config = require('../config/servor.config');


class Main_Card_User extends Component {

    constructor(props) {
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

    componentDidMount() {
        this.getUserInfo();
    }

    ///Get Measures  only if props has changed
    componentDidUpdate(prevProps, prevState, snapshot) {
        ///Get Profile Details only if props has changed
        if (this.props.userID !== prevProps.userID) {
            this.getUserInfo(this.props.userID);
        }
    }

    getUserInfo() {
        axios.get(config.url+`/user/` + this.props.userID)
            .then(res => {
                this.setState({
                    id: res.data._id,
                    lieu: res.data.location,
                    nbrPersonnes: res.data.personsInHouse,
                    taille: res.data.houseSize
                });
                this.getMeasureSensorNumber(this.props.userID);
            });
    };

    getMeasureSensorNumber() {
        let nbMesures = 0;
        let nbCapteurs = 0;
        let sensMeasures = [];
        let sensors = [];
        axios.get(config.url+`/user/` + this.props.userID + `/sensors/`)
            .then(res => {
                sensors = res.data;
                nbCapteurs= sensors.length;
                axios.get(config.url+`/measures`)
                    .then(res => {
                        sensMeasures = res.data;
                        for (let i = 0; i < sensors.length; i++) {
                            for (let j = 0; j < sensMeasures.length; j++) {
                                if (sensors[i]._id === sensMeasures[j].sensorID) {
                                    nbMesures++;
                                }
                            }
                        }
                        this.setState({
                            nbrSensor: nbCapteurs,
                            nbrMeasure : nbMesures
                        });
                    });
            });
    };


    render() {
        return (
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
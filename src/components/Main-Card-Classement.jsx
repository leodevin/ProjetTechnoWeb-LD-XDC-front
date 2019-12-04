import React, {Component} from "react";
import {Card, Row, Col} from "react-bootstrap";

import '../css/Main-Classement.css'

class Main_Card_Classemnt extends Component{

    constructor(props){
        super(props);

        this.state = {
            regional: 116,
            europeen: 1230,
            mondial: "130 320",
            premier: "123 870",
            nbrCoursesTotal: 102,
            nbrCoursesSemaine: 25
        }
    }

    render() {
        return(
            <Card className="mx-3 h-100" id="card-classement">
                <h2 className="title-classement">Classement</h2>
                <Row className="">
                    <Col id="classement-left">
                        <Row>
                            <Col>Régional</Col>
                            <Col className="classement-chiffres">{this.state.regional}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>Européen</Col>
                            <Col className="classement-chiffres">{this.state.europeen}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>Mondial</Col>
                            <Col className="classement-chiffres">{this.state.mondial}</Col>
                        </Row>
                        <br/>
                        <Row className="info-importante">
                            <Col>1er</Col>
                            <Col className="classement-chiffres">{this.state.premier}</Col>
                        </Row>
                    </Col>
                    <Col id="classement-right">
                        <Card.Title id="nombre-courses">{this.state.nbrCoursesTotal}</Card.Title>
                        <Card.Subtitle id="courses">Courses réalisées</Card.Subtitle>
                        <br/>
                        <Card.Text className="info-importante">+{this.state.nbrCoursesSemaine} depuis 1 semaine</Card.Text>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Main_Card_Classemnt;
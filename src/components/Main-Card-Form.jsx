import React, {Component} from "react";
import {Card, Button, Row, Col, Form} from "react-bootstrap";
import '../css/Main-Form.css'
import axios from 'axios'

class Main_Card_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChamps: [
                {nomChamps: "ID", nomPlaceHolder: "ObjectID"},
                {nomChamps: "LOCATION", nomPlaceHolder: "Pays"},
                {nomChamps: "PERSONNES DANS LA MAISON", nomPlaceHolder: "Nombre"},
                {nomChamps: "TAILLE DE LA MAISON", nomPlaceHolder: "Big/Medium/Small"}
            ],
            id: "",
            location: "",
            personnes: "",
            taille: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        axios.post('http://localhost:3000/user', {
            _id: this.state.id,
            location: this.state.location,
            personsInHouse: parseInt(this.state.personnes),
            houseSize: this.state.taille
        })
            .then(function (response) {
                console.log(response);
                event.preventDefault();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Card className="my-lg-5 my-md-4 my-sm-4 my-4">
                <Row className="mx-3 my-3 justify-content-between">
                    <Col className="col-lg-4 col-md-6 col-6">
                        <h2 className="title-form">Ajout d'un utilisateur</h2>
                    </Col>
                    <Col className="col-lg-4 col-md-6 col-6" id="col-form-button">
                        <Form.Control as="select" variant={"primary"}>
                            <option>AJOUTER</option>
                            <option>UPDATE</option>
                        </Form.Control>
                    </Col>
                </Row>
                <Card className="card-form">
                    <Row className="my-5 justify-content-center">
                        <Col lg={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col lg={4}><label>ID</label></Col>
                                    <Col lg={8}><input name={"id"} className="form-control" type="text" placeholder={"ObjectID"} onChange={this.handleChange}/></Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col lg={4}><label>LOCATION</label></Col>
                                    <Col lg={8}><input name={"location"} className="form-control" type="text" placeholder={"Pays"} onChange={this.handleChange}/></Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col lg={4}><label>PERSONNES DANS LA MAISON</label></Col>
                                    <Col lg={8}><input name={"personnes"} className="form-control" type="number" placeholder={"Nombre"} onChange={this.handleChange}/></Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col lg={4}><label>TAILLE DE LA MAISON</label></Col>
                                    <Col lg={8}><input name={"taille"} className="form-control" type="text" placeholder={"Big/Medium/Small"} onChange={this.handleChange}/></Col>
                                </Row>
                                <Button className="justify-content-center button-form" type={"submit"}>AJOUTER</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Card>
        );
    }
}

export default Main_Card_Form;

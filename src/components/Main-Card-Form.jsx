import React, {Component} from "react";
import {Card, Button, Row, Col, Form} from "react-bootstrap";
import '../css/Main-Form.css';
import axios from 'axios';

// MODELES DES FORMS
const creatUserChamps = [
    {nomChamps: "ID", nomPlaceHolder: "ObjectID", name: "id", type: "text"},
    {nomChamps: "LOCATION", nomPlaceHolder: "Pays", name: "location", type: "text"},
    {nomChamps: "PERSONNES DANS LA MAISON", nomPlaceHolder: "Nombre", name: "personnes", type: "number"},
    {nomChamps: "TAILLE DE LA MAISON", nomPlaceHolder: "Big/Medium/Small", name: "taille", type: "text"}];

const updateUserChamps = [
    {nomChamps: "LOCATION", nomPlaceHolder: "Pays", name: "location", type: "text"},
    {nomChamps: "PERSONNES DANS LA MAISON", nomPlaceHolder: "Nombre", name: "personnes", type: "number"},
    {nomChamps: "TAILLE DE LA MAISON", nomPlaceHolder: "Big/Medium/Small", name: "taille", type: "text"}];


const deleteUserChamps = [];



class Main_Card_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "Ajout",
            champs : creatUserChamps,
            valueChampsSelected: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.creatUser = this.creatUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    // Créer les states des champs du form en création
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    // Requet pour le form : creation d'utilisateur
    creatUser(event){
        axios.post('http://localhost:3000/user', {
            userId: this.state.id,
            location: this.state.location,
            personsInHouse: parseInt(this.state.personnes),
            houseSize: this.state.taille
        })
            .then(function (response) {
                event.preventDefault();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Requet pour le form : Update d'utilisateur
    updateUser(event){
        axios.put('http://localhost:3000/user/'+this.state.id, {
            userId: this.state.id,
            location: this.state.location,
            personsInHouse: parseInt(this.state.personnes),
            houseSize: this.state.taille
        })
            .then(function (response) {
                event.preventDefault();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Requet pour le form : delete d'utilisateur
    deleteUser(event){
        axios.delete('http://localhost:3000/user/' + this.state.id)
            .then(function (response) {
                alert("Utilisateur bien supprimer");
                console.log(response);
                axios.get('http://localhost:3000/user/'+ this.state.id +'/sensors')
                    .then(function (sensors) {
                        for (let i=0; i<sensors.length; i++){
                            axios.delete('http://localhost:3000/sensor/'+sensors[i]._id)
                                .then(function (response) {
                                    axios.get('http://localhost:3000/measure/'+sensors[i]._id+'/measures')
                                        .then(function (measures) {
                                            for (let i=0; i<measures.length; i++){
                                                axios.delete('http://localhost:3000/measure/'+measures[i]._id)
                                                    .then(function (response2) {
                                                        event.preventDefault();
                                                    })
                                            }
                                        })
                                })
                        }
                    })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Centre de redirection en fonction du type de form selectionner
    handleSubmit(event) {
        if (this.state.valueChampsSelected === 1){
            this.creatUser(event);
        }
        if (this.state.valueChampsSelected === 2){
            this.updateUser(event);
        }
        if (this.state.valueChampsSelected === 3){
            this.deleteUser(event);
        }
    }

    // Change les champs en fonction du type selectionner
    changeSelectButton(e){
        if(e.target.value === 1){
            this.setState({title: "Ajout",champs: creatUserChamps, valueChampsSelected: 1})
        }
        if(e.target.value === 2){
            this.setState({title: "Mise à jour", champs: updateUserChamps, valueChampsSelected: 2})
        }
        if(e.target.value === 3){
            this.setState({title: "Suppression", champs: deleteUserChamps, valueChampsSelected: 3})
        }
    }

    // Crée le state de l'user selectionner
    changeSelectUser(e){
        this.setState({id: e.target.value});
    }

    render() {
        const displayChamps = this.state.champs.map((post) =>
            <div><Row>
                    <Col lg={4}><label>{post.nomChamps}</label></Col>
                    <Col lg={8}><input name={post.name}
                                       className="form-control"
                                       type={post.type}
                                       placeholder={post.nomPlaceHolder}
                                       onChange={this.handleChange}/></Col>
                </Row><br/>
            </div>
            );

        if (this.state.valueChampsSelected === 2 || this.state.valueChampsSelected === 3){
            displayChamps.unshift(
                <div>
                    <Row>
                        <Col lg={4}><label>{"ID DES UTILISATEURS"}</label></Col>
                        <Col lg={8}><Form.Control as="select"
                                                  variant={"primary"}
                                                  onChange={this.changeSelectUser.bind(this)}>
                            {this.props.users.map((user) =>
                                <option value={user._id}>{user._id}</option>
                            )}
                        </Form.Control></Col>
                    </Row><br/>
                </div>
            );
        }


        return (
            <Card className="my-lg-5 my-md-4 my-sm-4 my-4">
                <Row className="mx-3 my-3 justify-content-between">
                    <Col className="col-lg-4 col-md-6 col-6">
                        <h2 className="title-form">{this.state.title + " d'un utilisateur"}</h2>
                    </Col>
                    <Col className="col-lg-4 col-md-6 col-6" id="col-form-button">
                        <Form.Control as="select"
                                      variant={"primary"}
                                      onChange={this.changeSelectButton.bind(this)}>
                            <option value={1}>AJOUTER UN UTILISATEUR</option>
                            <option value={2}>METTRE A JOUR UN UTILISATEUR</option>
                            <option value={3}>SUPPRIMER UN UTILISATEUR</option>
                        </Form.Control>
                    </Col>
                </Row>
                <Card className="card-form">
                    <Row className="my-5 justify-content-center">
                        <Col className={"col-8"}>
                            <Form onSubmit={this.handleSubmit}>
                                {displayChamps}
                                <br/>
                                <div>
                                <Button type={"submit"} className="btn btn-primary">ENVOYER</Button></div>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Card>
        );
    }
}

export default Main_Card_Form;

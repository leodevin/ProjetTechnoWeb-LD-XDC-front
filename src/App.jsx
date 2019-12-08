import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import {Row, Col, Container} from "react-bootstrap";

//Components
import Header_Card from "./components/Header-Card";
import Header_Navbar from "./components/Header-Navbar";
import Main_Card_Graph from "./components/Main-Card-Graph";
import Main_Card_Info from "./components/Main-Card-Info";
import Main_Card_User from "./components/Main-Card-User";
import Main_Card_Map from "./components/Main-Card-MapRadar";
import AnimatedRoute from "./animations/AnimatedRoute";
import AnimatedSwitch from "./animations/AnimatedSwitch";
import Main_Card_Form from "./components/Main-Card-Form";

//CSS
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            acceuilPosition: 0,
            fade: 0,
            idUserSelected: 0
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
    }

    handleChangeUser(id){
        this.setState({idUserSelected: id})
    };

    //https://tech.lalilo.com/dynamic-transitions-with-react-router-and-react-transition-group

    componentDidMount() {
        axios.get(`http://localhost:3000/users/`)
            .then(res => {
                const persons = res.data;
                this.setState({ users : persons });
            })
    }

    render() {

        return (
            <Router>
                <div className="App">
                    <header className="header-body bg-gradient-info">
                        <div className="container-fluid">
                            <Header_Navbar users={this.state.users} sendData={this.handleChangeUser}/>
                            <div className="row mx-5 justify-content-center">
                                <Header_Card
                                    description={this.state.idUserSelected}
                                    userID={this.state.idUserSelected}/>
                                <Header_Card
                                    description={"Pollution moyenne actuelle"}
                                    userID={this.state.idUserSelected}/>
                                <Header_Card
                                    description={"Humidité moyenne actuelle"}
                                    userID={this.state.idUserSelected}/>
                            </div>
                        </div>
                    </header>
                    <AnimatedSwitch animationClassName="page-slide" animationTimeout={500}>
                        <AnimatedRoute exact path="/"><Acceuil userID={this.state.idUserSelected}/></AnimatedRoute>
                        <AnimatedRoute path="/administration"><Administration/></AnimatedRoute>
                    </AnimatedSwitch>
                </div>
            </Router>
        );
    }
}

const Administration = () => (
    <main>
        <Container fluid className="main">
            <Row>
                <Col className="mx-5 middle-row">
                    <Main_Card_Form/>
                </Col>
            </Row>
        </Container><footer>
        <p>&copy; Copyright 2019 | Xavier de Cazenove x Léonard Devincre</p>
    </footer>
    </main>

);

const Acceuil = (props) => (
    <div>
        <Container fluid className="main">
            <Row className="mx-md-5 justify-content-center middle-row">
                <Col className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Graph userID={props.userID}/>
                </Col>
                <Col className="col-xl-4 col-lg-4 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Info userID={props.userID}/>
                </Col>
            </Row>
            <Row className="mx-md-5 justify-content-center">
                <Col className="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_User userID={props.userID}/>
                </Col>
                <Col className="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Map userID={props.userID}/>
                </Col>
            </Row>
        </Container>
        <footer>
            <p>&copy; Copyright 2019 | Xavier de Cazenove x Léonard Devincre</p>
        </footer>
    </div>
);

export default App;
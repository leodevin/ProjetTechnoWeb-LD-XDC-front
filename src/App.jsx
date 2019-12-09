import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import {Row, Col, Container} from "react-bootstrap";

//Components
import HeaderCard from "./components/Header-Card";
import HeaderNavbar from "./components/Header-Navbar";
import MainCardGraph from "./components/Main-Card-Graph";
import MainCardInfo from "./components/Main-Card-Info";
import MainCardUser from "./components/Main-Card-User";
import MainCardMap from "./components/Main-Card-MapRadar";
import AnimatedRoute from "./animations/AnimatedRoute";
import AnimatedSwitch from "./animations/AnimatedSwitch";
import MainCardForm from "./components/Main-Card-Form";

//CSS
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            acceuilPosition: 0,
            fade: 0,
            idUserSelected: "5ddb94c6fc13ae640c000014"
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
    }

    handleChangeUser(id){
        this.setState({idUserSelected: id})
    };

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
                            <HeaderNavbar users={this.state.users} sendData={this.handleChangeUser}/>
                            <div className="row mx-5 justify-content-center">
                                <HeaderCard
                                    description={"Temp. moyenne actuelle"}
                                    userID={this.state.idUserSelected}
                                    type={"temperature"}/>
                                <HeaderCard
                                    description={"Pollution moyenne actuelle"}
                                    userID={this.state.idUserSelected}
                                    type={"airPollution"}/>
                                <HeaderCard
                                    description={"Humidité moyenne actuelle"}
                                    userID={this.state.idUserSelected}
                                    type={"humidity"}/>
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
                    <MainCardForm/>
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
                    <MainCardGraph userID={props.userID}/>
                </Col>
                <Col className="col-xl-4 col-lg-4 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <MainCardInfo userID={props.userID}/>
                </Col>
            </Row>
            <Row className="mx-md-5 justify-content-center">
                <Col className="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <MainCardUser userID={props.userID}/>
                </Col>
                <Col className="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <MainCardMap userID={props.userID}/>
                </Col>
            </Row>
        </Container>
        <footer>
            <p>&copy; Copyright 2019 | Xavier de Cazenove x Léonard Devincre</p>
        </footer>
    </div>
);

export default App;

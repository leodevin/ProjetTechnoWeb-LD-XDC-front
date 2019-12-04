import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {Row, Col, Container} from "react-bootstrap";

//Components
import Header_Card from "./components/Header-Card";
import Header_Navbar from "./components/Header-Navbar";
import Main_Card_Graph from "./components/Main-Card-Graph";
import Main_Card_Info from "./components/Main-Card-Info";
import Main_Card_Classemnt from "./components/Main-Card-Classement";
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
            acceuilPosition: 0,
            fade: 0
        }
    }

    //https://tech.lalilo.com/dynamic-transitions-with-react-router-and-react-transition-group

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="header-body bg-gradient-info">
                        <div className="container-fluid">
                            <Header_Navbar/>
                            <div className="row mx-5 justify-content-center">
                                <Header_Card/>
                                <Header_Card/>
                                <Header_Card/>
                            </div>
                        </div>
                    </header>
                    <AnimatedSwitch animationClassName="page-slide" animationTimeout={500}>
                        <AnimatedRoute exact path="/"><Acceuil/></AnimatedRoute>
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

const Acceuil = () => (
    <div>
        <Container fluid className="main">
            <Row className="mx-5 justify-content-center middle-row">
                <Col className="col-lg-8 col-md-10 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Graph/>
                </Col>
                <Col className="col-lg-4 col-md-10 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Info/>
                </Col>
            </Row>
            <Row className="mx-5 justify-content-center">
                <Col className="col-lg-6 col-md-10 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Classemnt/>
                </Col>
                <Col className="col-lg-6 col-md-10 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Map/>
                </Col>
            </Row>
        </Container>
        <footer>
            <p>&copy; Copyright 2019 | Xavier de Cazenove x Léonard Devincre</p>
        </footer>
    </div>
);

export default App;
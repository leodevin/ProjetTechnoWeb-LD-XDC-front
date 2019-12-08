import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
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
            acceuilPosition: 0,
            fade: 0,

            dataGraph : [
                {name: '01/2019', Pollution: 55},
                {name: '02/2019', Pollution: 60},
                {name: '03/2019', Pollution: 33},
                {name: '04/2019', Pollution: 34},
                {name: '05/2019', Pollution: 39}
            ]
        }
    }

    //https://tech.lalilo.com/dynamic-transitions-with-react-router-and-react-transition-group

    render() {

        const user = [{_id: "User id 1", name: "leo je te baise"},{_id: "User id 2", name: "leo je te baise"}];

        return (
            <Router>
                <div className="App">
                    <header className="header-body bg-gradient-info">
                        <div className="container-fluid">
                            {/*Envoyer un tableau de tous les Users*/}
                            <Header_Navbar users={user}/>
                            <div className="row mx-5 justify-content-center">
                                <Header_Card
                                    description={"Température moyenne actuelle"}
                                    value={"21.5"}
                                    growth={"0.3"}/>
                                <Header_Card
                                    description={"Pollution moyenne actuelle"}
                                    value={"0.5"}
                                    growth={"0.1"}/>
                                <Header_Card
                                    description={"Humidité moyenne actuelle"}
                                    value={"3.5"}
                                    growth={"-0.4"}/>
                            </div>
                        </div>
                    </header>
                    <AnimatedSwitch animationClassName="page-slide" animationTimeout={500}>
                        <AnimatedRoute exact path="/"><Acceuil data={this.state.dataGraph}/></AnimatedRoute>
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
                    {/*Envoyer un tableau de measures pollution directement en paramètre --> + simple*/}
                    <Main_Card_Graph
                        data={props.data}/>
                </Col>
                <Col className="col-xl-4 col-lg-4 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Info
                        textJson={"Léonard je t'écris ce message pour te dire que JE TE BAISE Putain !"}/>
                </Col>
            </Row>
            <Row className="mx-md-5 justify-content-center">
                <Col className="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_User
                        id={"5ddb94c6fc13ae640c000014"}
                        lieu={"France"}
                        nbrPersonnes={4}
                        taille={"Big"}
                        nbrSensor={8}
                        nbrMeasure={16}/>
                </Col>
                <Col className="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-12 mt-lg-5 mt-2 justify-content-around">
                    <Main_Card_Map
                        bedroom={3}
                        livingroom={2}
                        bathroom={2}
                        entrance={1}/>
                </Col>
            </Row>
        </Container>
        <footer>
            <p>&copy; Copyright 2019 | Xavier de Cazenove x Léonard Devincre</p>
        </footer>
    </div>
);

export default App;
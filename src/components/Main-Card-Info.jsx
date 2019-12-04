import React, {Component} from "react";
import {Card, Button} from "react-bootstrap";
import '../css/Main-Info.css';


class Main_Card_Info extends Component{
    constructor(props){
        super(props);

        this.state = {
            jourSansAccident: 67
        }
    }
    render() {
        return(
            <Card text="white" className="mx-3 card-info">
                <div className="mx-3 info">
                    <h3>TEMPS PASSE SANS ACCIDENTS</h3>
                    <h1>+ {this.state.jourSansAccident} jours</h1>
                    <Card.Text>🤕</Card.Text>
                    <Card.Text>Ce qui ne me tue pas me rend plus fort !</Card.Text>
                    <Button id="accident" variant="dark" text="white" size="lg" style={{marginTop: "10%"}} block>Accident</Button>
                </div>
            </Card>
        );
    }
}

export default Main_Card_Info;
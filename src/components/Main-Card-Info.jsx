import React, {Component} from "react";
import {Card} from "react-bootstrap";
import '../css/Main-Info.css';


class Main_Card_Info extends Component{
    constructor(props){
        super(props);

        this.state = {
            textJson : "Aucune requête..."
        }
    }
    render() {
        return(
            <Card text="white" className="mx-3 card-info">
                <div className="mx-3 h-100 info">
                    <h3>DEBUG</h3>
                    <Card.Text className={"overflow-auto"} id={"debugText"}>
                        {this.state.textJson}
                    </Card.Text>
                </div>
            </Card>
        );
    }
}

export default Main_Card_Info;
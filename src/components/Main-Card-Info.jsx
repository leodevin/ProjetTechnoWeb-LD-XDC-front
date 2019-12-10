import React, {Component} from "react";
import {Card} from "react-bootstrap";
import '../css/Main-Info.css';
import axios from "axios";
const config = require('../config/servor.config');



class Main_Card_Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textJson: "Aucune requête..."
        }
    }

    componentDidMount() {
        this.getDebugInfo();
    }

    ///Get Measures  only if props has changed
    componentDidUpdate(prevProps, prevState, snapshot) {
        ///Get Profile Details only if props has changed
        if (this.props.userID !== prevProps.userID) {
            this.getDebugInfo(this.props.userID);
        }
    }

    getDebugInfo() {
        let sortedActivities = 0;
        let sensMeasures = [];
        let sensors = [];
        axios.get(config.url+`/user/` + this.props.userID + `/sensors/`)
            .then(res => {
                sensors = res.data;
                axios.get(config.url+`/measures`)
                    .then(res => {
                        sensMeasures = res.data;
                        var results = [];
                        for (let i = 0; i < sensors.length; i++) {
                            for (let j = 0; j < sensMeasures.length; j++) {
                                if (sensors[i]._id === sensMeasures[j].sensorID) {
                                    results.push(sensMeasures[j]);
                                }
                            }
                        }
                        var json;
                        sortedActivities = results.slice().sort((a, b) => b.date - a.date);
                        for (let i = 0; i < sortedActivities.length; i++) {
                            json+=JSON.stringify(sortedActivities[i], null);
                        }
                        this.setState({
                            textJson: json
                        });

                    });
            });
    };

    render() {
        return (
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
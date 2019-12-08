import React, {Component} from "react";
import axios from 'axios';
import '../css/Main-Graph.css'

import {AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import {Card} from "react-bootstrap";


class Main_Card_Graph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {name: '-/-', Pollution: 0},
                {name: '-/-', Pollution: 0},
                {name: '-/-', Pollution: 0},
                {name: '-/-', Pollution: 0},
                {name: '-/-', Pollution: 0}
            ]
        };
    }


    componentDidMount() {
        this.getGraphMeasures();
    }

    ///Get Measures  only if props has changed
    componentDidUpdate(prevProps, prevState, snapshot) {
        ///Get Profile Details only if props has changed
        if (this.props.userID !== prevProps.userID) {
            this.getGraphMeasures(this.props.userID);
        }
        console.log(this.props.userID);
    }

    getGraphMeasures() {
        let values = [{name: '-/-', Pollution: 0}, {name: '-/-', Pollution: 0}, {name: '-/-', Pollution: 0}, {name: '-/-', Pollution: 0}, {name: '-/-', Pollution: 0}];
        let sortedActivities = 0;
        let results;
        axios.get(`http://localhost:3000/user/` + this.props.userID + `/airPollutions`)
            .then(res => {
                results = res.data;
                console.log(results);
                sortedActivities = results.slice().sort((a, b) => b.date - a.date);
                for (let i = 0; i < sortedActivities.length; i++) {
                    values[4 - i].Pollution = sortedActivities[sortedActivities.length - 1 - i].value;
                    values[4 - i].name = sortedActivities[sortedActivities.length - 1 - i].creationDate;
                    if(i===4){
                        i=sortedActivities.length;
                    }
                }
                this.setState({
                    data: values
                });
            });
    };

    render() {
        const renderAreaChart = (
            <div id="container">
                <ResponsiveContainer>
                    <AreaChart data={this.state.data}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='Pollution' stroke='#8884d8' fillOpacity={1}
                              fill="url(#colorPv)"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );

        return (
            <Card className="mx-3 h-100" id="card-graph">
                <h2 className="title-graph">Evolution du taux de CO2 | Maison</h2>
                {renderAreaChart}
            </Card>
        );
    }
}

export default Main_Card_Graph;
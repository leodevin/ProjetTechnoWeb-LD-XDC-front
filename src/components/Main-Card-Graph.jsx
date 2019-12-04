import React, {Component} from "react";
import '../css/Main-Graph.css'

import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {Card} from "react-bootstrap";



class Main_Card_Graph extends Component{

    constructor(props){
        super(props);

        this.state = {
            data : [
                {name: 'Jan', Mensuel_Net: 960, Mensuel_Brut: 1200, amt: 2400},
                {name: 'Feb', Mensuel_Net: 1168, Mensuel_Brut: 1400, amt: 2400},
                {name: 'Mar', Mensuel_Net: 640, Mensuel_Brut: 800, amt: 2400},
                {name: 'Apr', Mensuel_Net: 1680, Mensuel_Brut: 2100, amt: 2400},
                {name: 'May', Mensuel_Net: 450, Mensuel_Brut: 560, amt: 2400},
                {name: 'Jun', Mensuel_Net: 2080, Mensuel_Brut: 2600, amt: 2400}
            ]
        };
    }

    render() {
        const renderAreaChart = (
            <div id="container">
                <ResponsiveContainer>
                    <AreaChart data={this.state.data}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4BCEF5" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#4BCEF5" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='Mensuel_Net' stroke='#4BCEF5' fillOpacity={1} fill="url(#colorPv)" />
                        <Area type='monotone' dataKey='Mensuel_Brut' stroke='#8884d8' fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );

        return(
            <Card className="mx-3" id="card-graph">
                <h2 className="title-graph">Satistiques des revenues</h2>
                {renderAreaChart}
            </Card>
        );
    }
}

export default Main_Card_Graph;
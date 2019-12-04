import React, {Component} from "react";
import '../css/Main-MapRadar.css'

import {Card} from "react-bootstrap";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';


class Main_Card_Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {subject: '16e', A: 120, B: 110, fullMark: 150},
                {subject: '17e', A: 98, B: 130, fullMark: 150},
                {subject: '18e', A: 86, B: 130, fullMark: 150},
                {subject: 'Levallois', A: 99, B: 100, fullMark: 150},
                {subject: '14e', A: 85, B: 90, fullMark: 150},
                {subject: '15e', A: 65, B: 85, fullMark: 150},
            ]
        }
    }

    render() {

        const renderRadarChart = (
            <ResponsiveContainer width="95%" height={200}>
                <RadarChart outerRadius={75} width={400} height={200} data={this.state.data}>
                    <defs>
                        <radialGradient id="colorVv">
                            <stop offset="5%" stopColor="#E01111" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#E01111" stopOpacity={1}/>
                        </radialGradient>
                    </defs>
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="subject"/>
                    <PolarRadiusAxis/>
                    <Radar name="Mike" dataKey="A" stroke="#E35757" fill="url(#colorVv)" fillOpacity={0.4}/>
                </RadarChart>
            </ResponsiveContainer>
    );

        return (
            <Card className="mx-3 my-1 h-100 p-3">
                <h2 className="title-map-radar">Zone de livraison préférées</h2>
                {renderRadarChart}
            </Card>
        );
    }
}

export default Main_Card_Map;
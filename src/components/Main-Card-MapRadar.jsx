import React, {Component} from "react";
import '../css/Main-MapRadar.css'

import {Card} from "react-bootstrap";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';


class Main_Card_Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {subject: 'Bedroom', A: props.bedroom, fullMark: 150},
                {subject: 'Livingroom', A: props.livingroom, fullMark: 150},
                {subject: 'Bathroom', A: props.bathroom, fullMark: 150},
                {subject: 'Entrance', A: props.entrance, fullMark: 150},
            ]
        }
    }

    render() {

        const renderRadarChart = (
            <ResponsiveContainer width="95%" height={250}>
                <RadarChart outerRadius={85}
                            width={400}
                            height={200}
                            data={this.state.data}>
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
            <Card className="mx-3 p-3 h-100">
                <h2 className="title-map-radar">Capteurs dans la maison</h2>
                {renderRadarChart}
            </Card>
        );
    }
}

export default Main_Card_Map;
import React, {Component} from "react";
import '../css/Main-MapRadar.css'

import {Card} from "react-bootstrap";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import axios from "axios";


class Main_Card_Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {subject: 'Bedroom', A: 0, fullMark: 150},
                {subject: 'Livingroom', A: 0, fullMark: 150},
                {subject: 'Bathroom', A: 0, fullMark: 150},
                {subject: 'Entrance', A: 0, fullMark: 150},
            ]
        }
    }

    componentDidMount() {
        this.getMapRadarMeasures();
    }

    ///Get Measures  only if props has changed
    componentDidUpdate(prevProps, prevState, snapshot) {
        ///Get Profile Details only if props has changed
        if (this.props.userID !== prevProps.userID) {
            this.getMapRadarMeasures(this.props.userID);
        }
    }

    getMapRadarMeasures() {
        let dataBedroom = 0;
        let dataLivingRoom = 0;
        let dataBathroom = 0;
        let dataEntrance = 0;
        let sensors=[];
        axios.get(`http://localhost:3000/user/`+this.props.userID+`/sensors/`)
            .then(res => {
                sensors = res.data;
                for(let i=0; i<sensors.length;i++){
                    if(sensors[i].location==="bedroom"){dataBedroom++;}
                    if(sensors[i].location==="livingroom"){dataLivingRoom++;}
                    if(sensors[i].location==="bathroom"){dataBathroom++;}
                    if(sensors[i].location==="entrance"){dataEntrance++;}
                }
                let values = [{subject: 'Bedroom', A: dataBedroom, fullMark: 150}, {subject: 'Livingroom', A: dataLivingRoom, fullMark: 150}, {subject: 'Bathroom', A: dataBathroom, fullMark: 150}, {subject: 'Entrance', A: dataEntrance, fullMark: 150},];
                this.setState({
                    data: values
                });
            });
    };

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
import React from 'react';
import axios from 'axios';
import '../css/Header.css';



class Header_Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: "None",
            value: 0,
            growth: 0,
            values:[]
        };
    }

    growthColor(){
        if(this.state.growth<0){
            return "red";
        }else {
            return "green";
        }
    }

    calculateGrowth(){
        let sortedActivities = this.state.values.slice().sort((a, b) => b.date - a.date);
        console.log(sortedActivities);
        if (sortedActivities.length>1){
            let percent = ((sortedActivities[sortedActivities.length-1].value/sortedActivities[sortedActivities.length-2].value)-1)*100;
            let res = parseFloat(percent).toFixed(2);
            this.setState({
                growth: res
            })
        }else{
            this.setState({
                growth: 0
            })
        }
    };

    calculateAverage(){
        let average=0;
        for (let i=0; i<this.state.values.length; i++){
            average+=this.state.values[i].value;
        }
        this.setState({
            value: average
        });
    }

    componentDidMount() {
        this.getUserMeasures();
    }

    ///Get Measures  only if props has changed
    componentDidUpdate(prevProps, prevState, snapshot) {
        ///Get Profile Details only if props has changed
        if (this.props.userID !== prevProps.userID) {
            this.getUserMeasures(this.props.userID);
        }
    }

    getUserMeasures(){
        axios.get(`http://localhost:3000/user/`+this.props.userID+`/`+this.props.type)
            .then(res => {
                const results = res.data;
                this.setState({ values : results });
                this.calculateAverage();
                this.calculateGrowth();
            });
    };

    render() {
        return (
            <div className="col-lg-4 col-md-10 col-12 mt-lg-5 mt-2 justify-content-around">
                <div className="fontHeaderCard">
                    <div className="card mx-3 p-3">
                        <h2 className="h2HeaderCard">{this.props.description}</h2>
                        <h1 className="h1HeaderCard">{this.state.value}</h1>
                        <h4 style={{color: this.growthColor()}}>{this.state.growth}%</h4>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header_Card;
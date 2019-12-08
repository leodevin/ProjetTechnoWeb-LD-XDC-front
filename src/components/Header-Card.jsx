import React from 'react';
import '../css/Header.css';



class Header_Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: "None",
            value: 0,
            growth: 0,
        };
    }

    growthColor(){
        if(this.state.growth<0){
            return "red";
        }else {
            return "green";
        }
    }


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
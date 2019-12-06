import React from "react";
import {Link} from "react-router-dom";
import logo from '../img/logo_veelo.png';
import '../css/Header.css';

//https://www.youtube.com/watch?v=8E6J0ZfeyBU
const styles = {
    transition: 'all 0.3s ease-out'
};


class Header_Navbar extends React.Component {
    constructor(props) {
        super(props);
        if (window.location.pathname == "/") {
            this.state = {
                acceuilScale: 1,
                acceuilPosition: 0,
                adminScale: 0.7,
                adminPosition: 0
            }
        } else {
            if (window.innerWidth >= 860) {
                this.state = {
                    acceuilScale: 0.7,
                    acceuilPosition: -350,
                    adminScale: 1,
                    adminPosition: -250
                }
            } else if (window.innerWidth > 520 && window.innerWidth < 860) {
                this.state = {
                    acceuilScale: 0.7,
                    acceuilPosition: -250,
                    adminScale: 1,
                    adminPosition: -220
                }
            } else {
                this.state = {
                    acceuilScale: 0.7,
                    acceuilPosition: -150,
                    adminScale: 1,
                    adminPosition: -160
                }
            }
        }
    }

    transitionLg() {
        this.setState({
            acceuilScale: 0.7,
            acceuilPosition: -250,
            adminScale: 1,
            adminPosition: -350
        });
    }

    transitionMd() {
        this.setState({
            acceuilScale: 0.7,
            acceuilPosition: -250,
            adminScale: 1,
            adminPosition: -220
        });
    }

    transitionSm() {
        this.setState({
            acceuilScale: 0.7,
            acceuilPosition: 0,
            adminScale: 1,
            adminPosition: 0
        });
    }

    selectAcceuil(event) {
        this.setState({
            acceuilScale: 1,
            acceuilPosition: 0,
            adminScale: 0.7,
            adminPosition: 0
        });
        if (this.state.acceuilScale === 1) {
            event.preventDefault();
        }
    }

    selectAdmin(event) {
        if (window.innerWidth >= 860) this.transitionLg();
        else if (window.innerWidth > 520 && window.innerWidth < 860) this.transitionMd();
        else this.transitionSm();

        if (this.state.acceuilScale === 0.7) {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="row align-text-bottom">
                <div className="logo">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Veelo"/>
                    </a>
                </div>
                <div className="acceuilSelect" style={{
                    ...styles,
                    transform: 'scale(' + this.state.acceuilScale + ') translate(' + this.state.acceuilPosition + 'px,0px)'
                }}>
                    <Link to="/" onClick={this.selectAcceuil.bind(this)}
                          style={{textDecoration: 'none', color: 'white'}}>Acceuil</Link>
                </div>
                <div className="adminSelect" style={{
                    ...styles,
                    transform: 'scale(' + this.state.adminScale + ') translate(' + this.state.adminPosition + 'px,0px)'
                }}>
                    <Link to="/administration" onClick={this.selectAdmin.bind(this)}
                          style={{textDecoration: 'none', color: 'white'}}>Administration</Link>
                </div>
            </div>
        )
    }
}

export default Header_Navbar;
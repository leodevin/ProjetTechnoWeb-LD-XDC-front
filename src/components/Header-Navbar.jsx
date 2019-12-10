import React from "react";
import {Link} from "react-router-dom";
import logo from '../img/logo_veelo.png';
import '../css/Header.css';
import Dropdown from "react-bootstrap/Dropdown";

//https://www.youtube.com/watch?v=8E6J0ZfeyBU
const styles = {
    transition: 'all 0.3s ease-out'
};


class Header_Navbar extends React.Component {
    constructor(props) {
        super(props);
        if (window.location.pathname === "/") {
            this.state = {
                acceuilScale: 1,
                acceuilPosition: 0,
                adminScale: 0.7,
                adminPosition: 0,
                headerSelected: "acceuilSelect"
            }
        } else {
            if (window.innerWidth >= 1024) {
                this.state = {
                    acceuilScale: 0.7,
                    acceuilPosition: -400,
                    adminScale: 1,
                    adminPosition: -250,
                    headerSelected: "adminSelect"
                }
            } else if (window.innerWidth > 800 && window.innerWidth < 1024) {
                this.state = {
                    acceuilScale: 0.7,
                    acceuilPosition: -350,
                    adminScale: 1,
                    adminPosition: -220,
                    headerSelected: "adminSelect"
                }
            } else {
                this.state = {
                    acceuilScale: 0.7,
                    acceuilPosition: 0,
                    adminScale: 1,
                    adminPosition: 0,
                    headerSelected: "adminSelect"
                }
            }
        }
    }


    //**** DIFFERENTES TRANSITIONS ****//
    transitionLg() {
        this.setState({
            acceuilScale: 0.7,
            acceuilPosition: -400,
            adminScale: 1,
            adminPosition: -250
        });
    }

    transitionMd() {
        this.setState({
            acceuilScale: 0.7,
            acceuilPosition: -350,
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

    /******************************************/


    //**** ITEMS SELECT ****//
    selectAcceuil(event) {
        this.setState({headerSelected: "acceuilSelect"});
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
        this.setState({headerSelected: "adminSelect"});
        if (window.innerWidth >= 1024) this.transitionLg();
        else if (window.innerWidth > 800 && window.innerWidth < 1024) this.transitionMd();
        else this.transitionSm();

        if (this.state.acceuilScale === 0.7) {
            event.preventDefault();
        }
    }

    /******************************************/


    handleClickItem(id) {
        this.props.sendData(id);
    };

    render() {
        // Création de tous les items
        const usersList = this.props.users.map((user) =>
            <Dropdown.Item href={"#"} onClick={() => this.handleClickItem(user._id)}>{user._id}</Dropdown.Item>
        );

        return (
            <div className="row align-text-bottom">
                <div className="logo">
                    <Dropdown>
                        <Dropdown.Toggle style={{backgroundColor: 'transparent', border: 'none'}} id="dropdown-basic">
                            <img src={logo} alt="Veelo"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {usersList}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={this.state.headerSelected} style={{
                    ...styles,
                    transform: 'scale(' + this.state.acceuilScale + ') translate(' + this.state.acceuilPosition + 'px,0px)'
                }}>
                    <Link to="/" onClick={this.selectAcceuil.bind(this)}
                          style={{textDecoration: 'none', color: 'white'}}>Acceuil</Link>
                </div>
                <div className={this.state.headerSelected} style={{
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
import React, { Component } from 'react';
import logo from '../../images/logo.png';
import "./navbar.css";
import _ from 'lodash';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-scroll'
class navbar extends Component {


    render() {
        let profile = JSON.parse(localStorage.getItem('profile'));


        return (
            <div className="navbar">
                <div className="branding">
                    <img src={logo} alt="image"></img>
                    <p className="square">Square<span>boat</span></p>
                </div>
                <div className="links" style={_.isNull(profile) ? { left: '80%' } : profile.userType === "Recruiter" ? { left: '65%' } : { left: '75%' }}>
                    <Link to="jobs" spy={true} smooth={true} ><p>Jobs</p></Link>
                    {!_.isNull(profile) && profile.userType === 'Recruiter' ? <p onClick={this.props.createJob}>Create a Job</p> : ''}
                    {_.isNull(profile) ?

                        <p style={{ marginTop: '-.2rem' }} onClick={() => this.props.modal(true)}><Button icon='sign in' content="Log In/Sign Up" onClick={this.props.modal} /></p>
                        :
                        <p>Hi <span>{profile.name}</span> <Button icon='sign in' content="Log out" onClick={this.props.logOut} />  </p>}

                </div>

            </div >

        )
    }
}

export default navbar

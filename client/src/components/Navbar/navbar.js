import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import logo from '../../images/logo.png';
import "./navbar.css";
import _ from 'lodash';
import { Button } from 'semantic-ui-react'
class navbar extends Component {


    render() {
        let profile = JSON.parse(localStorage.getItem('profile'));


        return (
            <div className="navbar">
                <div className="branding">
                    <img src={logo} alt="image"></img>
                    <p className="square">Square<span>boat</span></p>
                </div>
                <div className="links" style={_.isNull(profile) ? { left: '80%' } : { left: '65%' }}>
                    <p>Jobs</p>
                    {!_.isNull(profile) && profile.userType === 'Recruiter' ? <p>Create a Job</p> : ''}
                    {_.isNull(profile) ?

                        <p style={{ marginTop: '-.2rem' }} onClick={() => this.props.modal(true)}><Button icon='sign in' secondary content="Log In/Sign Up" onClick={this.props.modal} /></p>
                        :
                        <p>Hi <span>{profile.name}</span> <Button icon='sign in' secondary content="Log out" onClick={this.props.logOut} />  </p>}

                </div>

            </div >

        )
    }
}

export default navbar

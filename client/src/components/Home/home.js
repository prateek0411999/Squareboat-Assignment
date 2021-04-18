import React, { Component, useState } from 'react'
import Navbar from '../Navbar/navbar';
import CreateJob from '../CreateJob/createJob';
import { Button, Header, Icon, Modal, Checkbox, Form, Label } from 'semantic-ui-react';
import './home.css';
import axios from '../../axios/axios';
import { ToastContainer, toast } from 'react-toastify';

class Home extends Component {

    state = {
        open: false,
        signingIn: false,
        checked: false,
        refresh: false,
        dataForm: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            checked: '',
        }
    }
    componentDidMount() {
        this.setState({
            dataForm: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                checked: '',
            }
        });
    }
    openModal = (val) => {
        console.log('function fired', val)
        this.setState({ open: val });
    }
    onChangeCheckbox = (evt, data) => {
        let checked = data.checked


        this.setState({
            checked: checked
        })

        console.log(checked);
    }
    logOutHandler = () => {
        console.log('inside log out handler')
        localStorage.clear();
        this.setState({ refresh: !this.state.refresh })
    }
    submitDataForm = () => {
        let upIn = !this.state.signingIn ? '/signin' : '/signup'
        let url = this.state.checked ? `/recruiter${upIn}` : `/candidate${upIn}`;
        let postData = null;
        if (!this.state.signingIn) {
            postData = {
                email: this.state.dataForm.email,
                password: this.state.dataForm.password
            }

        } else {
            if (this.state.checked) {
                postData = {
                    firstName: this.state.dataForm.firstName,
                    lastName: this.state.dataForm.lastName,
                    email: this.state.dataForm.email,
                    password: this.state.dataForm.password,
                    confirmPassword: this.state.dataForm.confirmPassword,
                    userType: "Recruiter"

                }
            } else {
                postData = {
                    firstName: this.state.dataForm.firstName,
                    lastName: this.state.dataForm.lastName,
                    email: this.state.dataForm.email,
                    password: this.state.dataForm.password,
                    confirmPassword: this.state.dataForm.confirmPassword,
                    userType: "Candidate"
                }
            }
        }
        axios.post(url, postData)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('profile', JSON.stringify(response.data.result));
                this.setState({
                    dataForm: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        checked: '',
                    },
                    open: false
                });
                toast.success(this.state.signingIn ? 'You have successfully signed up' : 'Signing you in, Welcome back')
            })
            .catch(err => {
                console.log('error occured', err.message);
                this.setState({
                    dataForm: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        checked: '',
                    }
                });
                toast.error(err.message);
            })

    }
    valueChangeHandler = (event) => {
        this.setState({
            dataForm: {
                ...this.state.dataForm,
                [event.target.id]: event.target.value,
            },

        }, () => {
            console.log('checking the valuesssssssss', this.state.dataForm)
        });


    };
    render() {
        return (

            <div>

                {console.log('checking the checked value', this.state.checked)}
                <Navbar modal={this.openModal} logOut={this.logOutHandler} />
                <Modal
                    size='mini'
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    onOpen={() => this.setState({ open: true })}

                >
                    <Header icon="sign in" content={this.state.signingIn ? 'Sign Up to create an Account' : 'Sign In to Your Account'} />
                    <Modal.Content>
                        <Form>
                            {this.state.signingIn ? <div>
                                <Form.Field>
                                    <label>First Name</label>
                                    <input
                                        id="firstName"
                                        value={this.state.dataForm.firstName}
                                        onChange={(e) => this.valueChangeHandler(e)}
                                        placeholder='First Name'
                                        required />
                                </Form.Field>
                                <Form.Field>
                                    <label>Last Name</label>
                                    <input
                                        id="lastName"
                                        value={this.state.dataForm.lastName}
                                        onChange={(e) => this.valueChangeHandler(e)}
                                        placeholder='Last Name'
                                        required />
                                </Form.Field>
                            </div> : ''}
                            <Form.Field>
                                <label>Email</label>
                                <input
                                    id="email"
                                    value={this.state.dataForm.email}
                                    onChange={(e) => this.valueChangeHandler(e)}
                                    placeholder='Enter Your Email'
                                    required />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={this.state.dataForm.password}
                                    onChange={(e) => this.valueChangeHandler(e)}
                                    placeholder='Enter Your Password'
                                    required />
                            </Form.Field>
                            {this.state.signingIn ?
                                <div>
                                    <Form.Field>
                                        <label>Confirm Password</label>
                                        <input
                                            value={this.state.dataForm.confirmPassword}
                                            onChange={(e) => this.valueChangeHandler(e)}
                                            id="confirmPassword"
                                            type="password"
                                            placeholder='Re-Enter Your Password'
                                            required />
                                    </Form.Field> </div> : ''}
                            <Form.Field>
                                <div className="check" >
                                    <label style={{ fontSize: '15px' }}>Candidate  &nbsp; &nbsp;</label>
                                    <Checkbox checked={this.state.checked} toggle label='Recruiter'
                                        onClick={(evt, data) => this.onChangeCheckbox(evt, data)}

                                    />
                                </div>
                            </Form.Field>
                            <Button style={{ marginLeft: '8rem' }} onClick={this.submitDataForm} >{!this.state.signingIn ? 'Sign In' : 'Sign Up'}</Button>

                        </Form>
                        <p className="changeSign" onClick={() => this.setState({ signingIn: !this.state.signingIn, dataForm: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', checked: '' } })}><Icon name="sign in" />{!this.state.signingIn ? 'Create an Account for free, Sign Up' : 'Already have an Account? Sign in'}</p>
                    </Modal.Content>

                </Modal>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </div>
        )
    }
}

export default Home

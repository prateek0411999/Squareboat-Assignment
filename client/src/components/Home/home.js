import React, { Component, useState } from 'react'
import Navbar from '../Navbar/navbar';
import { Button, Header, Icon, Modal, Checkbox, Form, Label } from 'semantic-ui-react';
import './home.css';
import axios from '../../axios/axios';
import { ToastContainer, toast } from 'react-toastify';
import Section from './HomeSection/homeSection';
import ListCandidates from '../ListCandid/listCandidates';

class Home extends Component {

    state = {
        open: false,
        signingIn: false,
        checked: false,
        refresh: false,
        refreshdata: false,
        modalOpen: false,
        dataForm: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            checked: '',
        },
        dataJob: {
            jobTitle: '',
            salary: '',
            location: '',
            companyName: '',

        },
        createJobActive: false,
        jobs: [],
        jobPosted: []

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
        axios.get('/jobs/list')
            .then(res => {
                this.setState({
                    jobs: res.data
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.refreshdata !== this.state.refreshdata) {
            axios.get('/jobs/list')
                .then(res => {
                    this.setState({
                        jobs: res.data
                    }, () => {
                        if (localStorage.getItem('profile')) {
                            if (JSON.parse(localStorage.getItem('profile')).userType === 'Recruiter') {
                                let jobPosted = this.state.jobs.filter(job => job.recruiter === JSON.parse(localStorage.getItem('profile'))._id)
                                this.setState({
                                    jobPosted: jobPosted
                                })
                            }
                        }


                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    createJob = () => {
        if (localStorage.getItem('profile')) {
            this.setState({
                createJobActive: true,
                open: true,

            });

        }
    }
    onCloseOpen = (val) => {
        this.setState({
            modalOpen: val
        });
    }
    openModal = (val) => {
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

        localStorage.clear();
        toast.success('You have successfully logged out');
        this.setState({
            refresh: !this.state.refresh,
            createJobActive: false
        })
    }
    submitDataJob = () => {

        let profile = JSON.parse(localStorage.getItem('profile'));
        let postData = {
            jobTitle: this.state.dataJob.jobTitle,
            salary: this.state.dataJob.salary,
            location: this.state.dataJob.location,
            companyName: this.state.dataJob.companyName,
            recruiter: profile._id
        }
        axios.post('/jobs/create', postData, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(response => {

                toast.success('Job created successfully');
                this.setState(prevState => ({
                    refreshdata: !prevState.refreshdata,
                }));
            })
            .catch(err => {
                console.log(err);
            })
        this.setState({
            dataJob: {
                jobTitle: '',
                salary: '',
                location: '',
                companyName: '',

            }, open: false
        });
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
                localStorage.setItem('token', "Bearer " + response.data.token);
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
                    open: false,

                });
                this.setState(prevState => ({
                    refreshdata: !prevState.refreshdata,
                }));
                toast.success(this.state.signingIn ? 'You have successfully signed up' : 'Signing you in, Welcome back')
            })
            .catch(err => {
                console.log(err.message);
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

        });


    };
    showApplications = () => {
        this.setState({
            modalOpen: true
        })
    }
    jobChangeHandler = (event) => {
        this.setState({
            dataJob: {
                ...this.state.dataJob,
                [event.target.id]: event.target.value,
            },

        });
    }
    applyOnJob = (jobId) => {
        this.setState({
            loading: true
        })
        let candidateData = JSON.parse(localStorage.getItem('profile'))
        let postData = {
            email: candidateData.email,
            jobId: jobId
        }
        axios.post('/jobs/apply', postData, { headers: { 'Authorization': localStorage.getItem('token') } })
            .then(res => {

                toast.success('Job Application Applied Successfully');
                this.setState(prevState => ({
                    refreshdata: !prevState.refreshdata,
                    loading: false
                }));
            })
            .catch(err => console.log(err))
    }
    popApply = () => {

        toast.info('Please login to apply for job');
        this.setState({ open: true })
    }
    render() {
        return (

            <div>

                <Navbar
                    modal={this.openModal}
                    logOut={this.logOutHandler}
                    createJob={this.createJob} />
                <ListCandidates
                    modalOpen={this.state.modalOpen}
                    onCloseOpen={this.onCloseOpen}
                    data={this.state.jobPosted} />
                <Section
                    jobs={this.state.jobs}
                    applyJob={this.applyOnJob}
                    popApply={this.popApply}
                    showApplications={this.showApplications}
                    loading={this.state.loading}
                    profile={localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null} />

                <Modal
                    size='mini'
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    onOpen={() => this.setState({ open: true })}

                >
                    {!this.state.createJobActive ? <Header icon="sign in" content={this.state.signingIn ? 'Sign Up to create an Account' : 'Sign In to Your Account'} /> : <Header icon="user secret" content='Create a Job' />}
                    <Modal.Content>
                        {!this.state.createJobActive ? <div>
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
                        </div>
                            : <Form>
                                <Form.Field>
                                    <label>Job Title</label>
                                    <input
                                        id="jobTitle"
                                        value={this.state.dataJob.jobTitle}
                                        onChange={(e) => this.jobChangeHandler(e)}
                                        placeholder='Enter Job Title'
                                        required />
                                </Form.Field>
                                <Form.Field>
                                    <label>Salary</label>
                                    <input
                                        id="salary"
                                        value={this.state.dataJob.salary}
                                        onChange={(e) => this.jobChangeHandler(e)}
                                        placeholder='Enter the salary '
                                        required />
                                </Form.Field>
                                <Form.Field>
                                    <label>Location</label>
                                    <input
                                        id="location"
                                        value={this.state.dataJob.location}
                                        onChange={(e) => this.jobChangeHandler(e)}
                                        placeholder='Enter Location'
                                        required />
                                </Form.Field>
                                <Form.Field>
                                    <label>Company Name</label>
                                    <input
                                        id="companyName"
                                        value={this.state.dataJob.companyName}
                                        onChange={(e) => this.jobChangeHandler(e)}
                                        placeholder='Enter Company Name'
                                        required />
                                </Form.Field>
                                <Button style={{ marginLeft: '8rem' }} onClick={this.submitDataJob} >Create Job</Button>
                            </Form>}</Modal.Content>

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

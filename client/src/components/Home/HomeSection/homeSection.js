import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import logo from '../../../images/jobPap.jpg';
import cardPhoto from '../../../images/logo.png';
import wantJob from '../../../images/WantJob.jpg';
import { Link } from 'react-scroll'
import './homeSection.css';
import _ from "lodash";
class homeSection extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className="Container">
                        <div className="hero flex items-center justify-between">
                            <div className="left flex-1 flex justify-center" >
                                <img src={logo} alt="" />
                            </div>
                            <div className="right flex-1">
                                <h6>SquareBoat Assignment</h6>
                                <h1>We Provide The Best<span>JOBS</span> </h1>
                                <p>Are you looking for a job change ? Have you been pissed with your current job ? Don't Worry we got everything covered for you on a single platform, Come Join us and explore the boundaries of your career .</p>
                                <div>
                                    {!_.isNull(this.props.profile) ? this.props.profile.userType === 'Recruiter' ? <Button icon='align justify' onClick={this.props.showApplications} content='Check Applications' /> : <Link to="jobs" spy={true} smooth={true} > <Button icon='search' content='Explore Jobs' /></Link> : <Link to="jobs" spy={true} smooth={true} > <Button icon='search' content='Explore Jobs' /></Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section id="jobs" className="blog">
                    <div className="container">
                        <h1 className="section-heading">
                            <span>See all</span>
                    Jobs
                </h1>
                        <p>We provide the jobs you are looking for, check this out</p>

                        <div className="card-wrapper">
                            {!_.isEmpty(this.props.jobs) ? this.props.jobs.map(job =>
                                <div className="card" key={job._id}>
                                    <div className="img-wrapper">
                                        <img src={cardPhoto} />

                                    </div>
                                    <div className="card-content">
                                        <a >
                                            <h1>{job.jobTitle}  </h1>
                                        </a>
                                        <span>salary : {job.salary}</span>
                                        <p>Location: {job.location}</p>
                                        <p>Company Name: {job.companyName}</p>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ea sequi, blanditiis temporibus molestiae ut delectus reprehenderit suscipit iure? Officia suscipit officiis quidem est ratione.</p>
                                        {!_.isNull(this.props.profile) ? job.candidates.find(can => can._id === this.props.profile._id) ? <Button className="applyButton" disabled content='Already Applied' /> :
                                            <Button className="applyButton" disabled={!_.isNull(this.props.profile) ? this.props.profile.userType === 'Recruiter' : false} color='blue' onClick={() => this.props.applyJob(job._id)} loading={this.props.loading} content='Apply' /> : <Button className="applyButton" onClick={this.props.popApply} color='blue' content='Apply' />}
                                    </div>
                                </div>

                            ) : ''}
                        </div>

                    </div>


                </section>
                <footer>
                    <img className="footer-logo" src={wantJob} alt="" />

                    <div className="copy-right">
                        Copyright 2019 Name PSD Template, All Rights Reserved
            </div>
                </footer>
            </div>
        )
    }
}

export default homeSection

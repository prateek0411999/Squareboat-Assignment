import React, { Component } from 'react'
import { Modal, Header, Table, Menu, Icon, Label } from 'semantic-ui-react';
import _ from 'lodash';
let jobPostedByRecruites = [];
class listCandidates extends Component {

    render() {
        console.log('Jobsss', this.props.data)
        return (
            <div>
                <Modal

                    open={this.props.modalOpen}
                    onClose={() => this.props.onCloseOpen(false)}
                    onOpen={() => this.props.onCloseOpen(true)}

                >
                    <Header icon="sign in" content='Candidates Applied to Your Jobs' />
                    <Modal.Content>
                        <Table inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Job candidate list</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    {!_.isEmpty(this.props.data) ? this.props.data.map(job => (<div>
                                        <Table.Cell key={job._id}>
                                            <Label ribbon>{job.jobTitle}</Label>

                                            {job.candidates.map(candid => (<div key={candid._id}>
                                                <Table.Cell></Table.Cell>
                                                <Table.Cell>{candid.name}</Table.Cell>
                                                <Table.Cell>{candid.email}</Table.Cell></div>))}
                                        </Table.Cell> </div>)) : null}
                                </Table.Row>
                            </Table.Body>


                        </Table>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default listCandidates

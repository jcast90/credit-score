import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { fetchReports, fetchScores } from "../actions";
import CreditScores from './CreditScores';
import Accounts from './Accounts';

class Reports extends Component {
    componentDidMount(){
        this.props.fetchReports();
    }

    render() {
        return (
            <Container maxWidth="lg">
                <CreditScores />
                <Accounts reports={this.props.reports} />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return { reports: state.reports[0] }
}

export default connect(mapStateToProps, { fetchReports, fetchScores })(Reports);
import React, { Component } from 'react'

// TODO: re-enable accounts once the reducers are cleaned up
import Accounts from './Accounts'
import { Container } from '@material-ui/core'
import CreditScores from './CreditScores'
import { bootstrapApp } from '../actions'
import { connect } from 'react-redux'

class Reports extends Component {
  componentDidMount() {
    this.props.bootstrapApp()
  }

  render() {
    return (
      <Container maxWidth='lg'>
        <CreditScores />
        {/* TODO: re-enable accounts once the reducers are cleaned up */}
        {/* <Accounts reports={this.props.reports} /> */}
      </Container>
    )
  }
}

export default connect(
  null,
  { bootstrapApp },
)(Reports)

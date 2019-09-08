import React, { PureComponent } from 'react'

import Accounts from './Accounts'
import { Container } from '@material-ui/core'
import CreditScores from './CreditScores'
import { bootstrapApp } from '../actions'
import { connect } from 'react-redux'

class Reports extends PureComponent {
  componentDidMount() {
    this.props.bootstrapApp()
  }

  render() {
    return (
      <Container maxWidth='lg'>
        <CreditScores />
        <Accounts />
      </Container>
    )
  }
}

export default connect(
  null,
  { bootstrapApp },
)(Reports)

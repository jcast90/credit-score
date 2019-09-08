import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import React, { Component } from 'react'

class Accounts extends Component {
  state = {
    accounts: [],
    selectedAccount: 'equifax',
    currentPage: 0,
    rowsPerPage: 5,
  }

  componentDidUpdate(prev, next) {
    if (prev.reports !== this.props.reports) {
      let bureauAccounts = {}
      this.props.reports.map(account => {
        const bureau = account.bureau.toLowerCase()
        return (bureauAccounts[bureau] = account.accounts)
      })
      this.setState({ accounts: [bureauAccounts] })
    }
  }

  selectedAccount = (bureau = 'equifax') => {
    this.setState({ selectedAccount: bureau, currentPage: 0 })
  }

  renderButtons = () => {
    if (this.state.accounts.length > 0) {
      const bureauNames = Object.keys(this.state.accounts[0])

      return bureauNames.map(bureau => {
        return (
          <Grid item key={bureau} style={{ margin: '25px' }}>
            <Button
              style={
                this.state.selectedAccount === bureau
                  ? { backgroundColor: 'red' }
                  : {}
              }
              onClick={() => this.selectedAccount(bureau)}
              variant='contained'
              color='primary'
            >
              {bureau}
            </Button>
          </Grid>
        )
      })
    }

    return null
  }
  handleChangePage = (e, newPage) => {
    this.setState({ currentPage: newPage })
  }

  handleRowChange = e => {
    this.setState({ rowsPerPage: e.target.value, currentPage: 0 })
  }

  renderAccounts = () => {
    if (this.state.accounts.length > 0) {
      const { accounts, selectedAccount, currentPage, rowsPerPage } = this.state

      return accounts[0][selectedAccount]
        .slice(
          currentPage * rowsPerPage,
          currentPage * rowsPerPage + rowsPerPage,
        )
        .map((account, index) => {
          return (
            <TableRow key={`${account.number}-${index}`}>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.number}</TableCell>
              <TableCell>
                {selectedAccount === 'equifax' ? account.balance : '-'}
              </TableCell>
              <TableCell>
                {selectedAccount === 'transunion' ? account.balance : '-'}
              </TableCell>
              <TableCell>
                {selectedAccount === 'experian' ? account.balance : '-'}
              </TableCell>
            </TableRow>
          )
        })
    }
  }

  render() {
    const { accounts, selectedAccount, currentPage, rowsPerPage } = this.state
    const accountLength = accounts[0] ? accounts[0][selectedAccount].length : 0

    return (
      <div>
        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
        >
          {this.renderButtons()}
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account Name</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Equifax</TableCell>
              <TableCell>TransUnion</TableCell>
              <TableCell>Experian</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderAccounts()}</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={accountLength}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleRowChange}
        />
      </div>
    )
  }
}

export default Accounts

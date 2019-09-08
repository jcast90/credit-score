import * as selectors from '../selectors'

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
import React, { PureComponent } from 'react'
import {
  setAccountsShownPerPage,
  setActiveBureau,
  setActivePage,
} from '../actions'

import { connect } from 'react-redux'

class Accounts extends PureComponent {
  renderButtons() {
    const { bureaus, setActiveBureau } = this.props
    return bureaus.map(bureau => {
      return (
        <Grid item key={bureau} style={{ margin: '25px' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setActiveBureau(bureau)}
          >
            {bureau}
          </Button>
        </Grid>
      )
    })
  }

  render() {
    const { accounts } = this.props
    return (
      <React.Fragment>
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
          <TableBody>
            {accounts.map(account => (
              <TableRow key={account.number}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.number}</TableCell>
                <TableCell>
                  {account.bureau === 'Equifax' ? account.balance : '--'}
                </TableCell>
                <TableCell>
                  {account.bureau === 'TransUnion' ? account.balance : '--'}
                </TableCell>
                <TableCell>
                  {account.bureau === 'Experian' ? account.balance : '--'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
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
      /> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  accounts: selectors.accounts.getVisibleAccounts(state),
  bureaus: selectors.bureaus.getNames(state),
})

const mapDispatchToProps = {
  setActivePage,
  setActiveBureau,
  setAccountsShownPerPage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accounts)

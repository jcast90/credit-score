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

import { ACCOUNTS_PER_PAGE_OPTIONS } from '../common/config'
import { connect } from 'react-redux'

class Accounts extends PureComponent {
  renderButtons() {
    const { activeBureau, bureaus, setActiveBureau } = this.props
    return bureaus.map(bureau => {
      return (
        <Grid item key={bureau} style={{ margin: '25px' }}>
          <Button
            variant='contained'
            color={activeBureau === bureau ? 'primary' : ''}
            onClick={() => setActiveBureau(bureau)}
          >
            {bureau}
          </Button>
        </Grid>
      )
    })
  }

  handlerPageChange = (e, newPage) => {
    this.props.setActivePage(newPage)
  }

  handleRowChange = e => {
    this.props.setAccountsShownPerPage(e.target.value)
  }

  render() {
    const { activePage, accounts, rowsPerPage, totalCount } = this.props
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
            {accounts.map((account, idx) => (
              <TableRow key={`${account.number}-${idx}`}>
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
        <TablePagination
          component='div'
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={activePage}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={this.handlerPageChange}
          onChangeRowsPerPage={this.handleRowChange}
          rowsPerPageOptions={ACCOUNTS_PER_PAGE_OPTIONS}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  accounts: selectors.accounts.getVisibleAccounts(state),
  activePage: selectors.accounts.getActivePage(state),
  activeBureau: selectors.accounts.getActiveBureau(state),
  totalCount: selectors.accounts.getTotalVisibleCount(state),
  rowsPerPage: selectors.accounts.getRowsPerPage(state),
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

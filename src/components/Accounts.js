import React, { Component } from 'react';
import { Button, Grid, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';

class Accounts extends Component {
    state = { 
        accounts: [],
        selectedAccount: 'equifax'
    }

    componentDidUpdate(prev, next) {
        if(prev.reports !== this.props.reports){
            let bureauAccounts = {};
            this.props.reports.map(account => {
                const bureau = account.bureau.toLowerCase();
                return bureauAccounts[bureau] = account.accounts
            })
            this.setState({ accounts: [bureauAccounts]})
        }
    }

    selectedAccount = (bureau = 'equifax') => {
        this.setState({ selectedAccount: bureau})
    }

    renderButtons = () => {
        if(this.state.accounts.length > 0){
           const bureauNames = Object.keys(this.state.accounts[0]);

           return bureauNames.map(bureau => {
               return (
                    <Grid item key={bureau} style={{margin: "25px"}}>
                        <Button 
                            style={this.state.selectedAccount === bureau ? {backgroundColor: 'red'} : {}}
                            onClick={() => this.selectedAccount(bureau)} 
                            variant="contained" 
                            color="primary"
                        >{bureau}</Button>
                    </Grid>
                )
           });
        }

        return null;
    }

    renderAccounts = () => {
        if(this.state.accounts.length > 0){
            const { accounts, selectedAccount } = this.state;

            return accounts[0][selectedAccount].map( (account, index) => {
                return (
                    <TableRow key={`${account.number}-${index}`} >
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.number}</TableCell>
                        <TableCell>{selectedAccount === 'equifax' ? account.balance : '-'}</TableCell>
                        <TableCell>{selectedAccount === 'transunion' ? account.balance : '-'}</TableCell>
                        <TableCell>{selectedAccount === 'experian' ? account.balance : '-'}</TableCell>
                    </TableRow>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
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
                        {this.renderAccounts()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default Accounts;
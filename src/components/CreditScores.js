import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchScores } from "../actions";
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

class CreditScores extends Component {
    componentDidMount(){
        this.props.fetchScores()
    }

    renderScores(){
        const data = this.props.scores[0] || [];

       return data.map( (scores,index) => {
            const { bureau, score } = scores;
            return (
                <TableRow key={`${bureau}-${index}`}>
                    <TableCell>{bureau}</TableCell>
                    <TableCell>{score}</TableCell>
                </TableRow>
            )
        })
    }

    render() {
        
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Bureau </TableCell>
                        <TableCell> Score </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.renderScores()}
                </TableBody>
            </Table>
        );
    }
}

const mapStateToProps = state => {
    return { scores: state.scores }
}

export default connect(mapStateToProps, { fetchScores })(CreditScores);
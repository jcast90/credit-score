import * as selectors from '../selectors'

import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

import React from 'react'
import { connect } from 'react-redux'

const CreditScores = ({ bureauScores }) => {
  return !(bureauScores && bureauScores.length) ? (
    <LinearProgress />
  ) : (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Bureau</TableCell>
          <TableCell>Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bureauScores.map(({ bureau: name, score }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>{score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const mapStateToProps = state => ({
  bureauScores: selectors.bureaus.getScores(state),
})

export default connect(mapStateToProps)(CreditScores)

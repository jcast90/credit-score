import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Reports from './Reports';

class App extends Component {
    render() {
        return (
            <Container maxWidth="lg">
                <Reports />
            </Container>
        );
    }
}

export default App;
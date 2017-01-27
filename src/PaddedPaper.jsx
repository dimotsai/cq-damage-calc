import React from 'react';
import Paper from 'material-ui/Paper';
import ClearFix from 'material-ui/internal/ClearFix';

export default class PaddedPaper extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Paper style={{padding: 20, marginBottom: 10}}>
                <ClearFix />
                {this.props.children}
            </Paper>
        );
    }
}

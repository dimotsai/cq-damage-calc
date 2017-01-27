import React from 'react'
import spacing from 'material-ui/styles/spacing';

export default class PageContents extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div style={{ paddingTop: spacing.desktopKeylineIncrement }}>{this.props.children}</div>
        );
    }
}

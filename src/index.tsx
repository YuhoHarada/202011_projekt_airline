import * as React from 'react';
import * as ReactDom from 'react-dom';

class Hello extends React.Component {
    public render(): React.ReactNode {
        return (
            <h1>Test</h1>
        );
    }
}

ReactDom.render(
    <Hello />,
    document.getElementById('root')
);
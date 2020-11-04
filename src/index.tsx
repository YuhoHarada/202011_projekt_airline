import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Cards } from './Component/Cards'

class App extends React.Component {
    render() {
        return (
            <>
                <Cards />
            </>
        );
    }
}

ReactDom.render(
    <App />,
    document.getElementById('root')
);

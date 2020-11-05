import * as React from 'react';

export class Header extends React.Component {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        return (
            <header>
                <h1>AAA-AirTicket dashboard</h1>
                <ul>
                    <li><a href="#app">TOP</a></li>
                    <li><a href="#passenger">PASSENGER</a></li>
                    <li><a href="#post">Add</a></li>
                </ul>
            </header>
        );
    }
}

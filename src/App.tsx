import * as React from 'react';
import { Header } from './Component/Header'
import { Cards } from './Component/Cards'
import { MyDataTable } from './Component/MyDataTable'
import { AddPassenger } from './Component/AddPassenger';

export class App extends React.Component {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        return (
            <div id="app" className="app">
                <Header />
                <Cards />
                <MyDataTable />
                <AddPassenger />
            </div>
        );
    }
}

import * as React from 'react';
import { Header } from './Component/Header'
import { Cards } from './Component/Cards'
import { MyDataTable } from './Component/MyDataTable'
import { AddPassenger } from './Component/AddPassenger';

export class App extends React.Component {
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

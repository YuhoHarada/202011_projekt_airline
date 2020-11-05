import * as React from 'react';
import { Header } from './Component/Header'
import { Cards } from './Component/Cards'
import { MyDataTable } from './Component/MyDataTable'

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Cards />
                <MyDataTable />
            </div>
        );
    }
}

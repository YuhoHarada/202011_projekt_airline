import * as React from 'react';
import { ApiGet } from './ApiGet';
import { Card, DataTable, Page } from '@shopify/polaris';

type passengerType = {
    _id: string;
    name: string;
    trips: number;
}

type passengerjsonType = {
    totalPassengers: number;
    totalPages: number;
    data: passengerType[];
}

type rowsArray = [string, string, number, string];

type DTState = {
    totalPassengers: number;
    totalPages: number;
    data: passengerType[];
    rows: Array<rowsArray>;
    activPage: number;
    pagination: number[];
    showStart: number;
    showEnd: number;
}

export class MyDataTable extends React.Component<unknown, DTState> {
    constructor(props: DTState) {
        super(props);
        this.state = {
            totalPassengers: 0,
            totalPages: 0,
            data: [],
            rows: [],
            activPage: 0,
            pagination: [],
            showStart: 1,
            showEnd: 25
        };
    }
    async componentDidMount() {
        const passenersData: passengerjsonType = await ApiGet("https://api.instantwebtools.net/v1/passenger?page=" + this.state.activPage + "&size=25")
        const rows: Array<rowsArray> = []
        const pagination: number[] = []
        await passenersData.data.forEach((elt: passengerType) => {
            const item: rowsArray = ["", "", 0, ""]
            item[0] = elt._id
            item[1] = elt.name
            item[2] = elt.trips
            item[3] = "€ " + (elt.trips * 199).toLocaleString()
            rows.push(item)
        })
        this.setState({ rows });
        this.setState({ totalPassengers: passenersData.totalPassengers });
        this.setState({ totalPages: passenersData.totalPages },()=>{
            if(this.state.activPage < 5){
                let i = 0
                while(i < 10){
                    pagination.push(i)
                    i++
                }
            }else if(this.state.activPage > this.state.totalPages - 4){
                let i: number = this.state.totalPages - 10
                while (i < this.state.totalPages) {
                    pagination.push(i)
                    i++
                }
            } else {
                let i: number = this.state.activPage - 4
                while (i < this.state.activPage + 6) {
                    pagination.push(i)
                    i++
                }
            }
            this.setState({ pagination });
            const showStart: number = (this.state.activPage + 1) * 25 - 24
            let showEnd: number = (this.state.activPage + 1) * 25
            if(showEnd> this.state.totalPassengers){
                showEnd = this.state.totalPassengers
            }
            this.setState({ showStart });
            this.setState({ showEnd });
        });
    }
    handlePage = (pageNumber: number) => {
        this.setState({ activPage: pageNumber },()=>{
            this.componentDidMount()
        });
    }
    public render(): React.ReactNode {
        return (
            <div id="passenger">
                <Page title="Passenger Data">
                    <Card>
                        <DataTable
                            columnContentTypes={[
                                'text',
                                'text',
                                'numeric',
                                'numeric',
                            ]}
                            headings={[
                                'ID',
                                'Name',
                                'Number of trips',
                                'Total amount paid for flights',
                            ]}
                            rows={this.state.rows}
                            footerContent={`Showing ${this.state.showStart} - ${this.state.showEnd} of ${this.state.totalPassengers} results`}
                        />
                    </Card>
                    <div id="pagination">
                        <button onClick={() => this.handlePage(0)}>&lt;</button>
                        {this.state.pagination.map((elt, i) =>
                            {
                                if(elt === this.state.activPage) {
                                    return <button className="activ" key={i} onClick={() => this.handlePage(elt)}>{elt + 1}</button>
                                } else {
                                    return <button key={i} onClick={() => this.handlePage(elt)}>{elt + 1}</button>
                                }
                            }
                        )}
                        <button onClick={() => this.handlePage(this.state.totalPages-1)}>&gt;</button>
                    </div>
                </Page>
            </div>
        );
    }
}

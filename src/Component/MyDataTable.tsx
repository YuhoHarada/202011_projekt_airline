import * as React from 'react';
import { ApiGet } from './ApiGet';
import { Card, DataTable, Page } from '@shopify/polaris';

type passengerType = {
    _id: string;
    name: string;
    trips: number;
}

type DTState = {
    totalPassengers: number;
    totalPages: number;
    data: passengerType[];
    rows: any[];
    activPage: number;
    pagination: any[];
    showStart: number;
    showEnd: number;
}

export class MyDataTable extends React.Component<{}, DTState> {
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
        const passenersData: any = await ApiGet("https://api.instantwebtools.net/v1/passenger?page=" + this.state.activPage + "&size=25")
        let rows: any = []
        let pagination: any = []
        await passenersData.data.forEach((elt: passengerType) => {
            let item: any = []
            item.push(elt._id)
            item.push(elt.name)
            item.push(elt.trips)
            item.push("€ " + (elt.trips * 199).toLocaleString())
            rows.push(item)
        })
        this.setState({ rows });
        this.setState({ totalPassengers: passenersData.totalPassengers });
        this.setState({ totalPages: passenersData.totalPages },()=>{
            if(this.state.activPage < 5){
                let i:number = 0
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
            let showStart: number = (this.state.activPage + 1) * 25 - 24
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
                <div>
                    <button onClick={() => this.handlePage(0)}>&lt;</button>
                    {this.state.pagination.map((elt, i) =>
                        <button key={i} onClick={()=> this.handlePage(elt)}>{elt+1}</button>
                    )}
                    <button onClick={() => this.handlePage(this.state.totalPages-1)}>&gt;</button>
                </div>
            </Page>
        );
    }
}

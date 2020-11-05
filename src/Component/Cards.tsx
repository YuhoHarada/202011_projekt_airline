import * as React from 'react';
import { ApiGet } from './ApiGet';
import { Card } from '@shopify/polaris';

type airlinesType = {
    id: number;
    name: string;
    country: number;
    logo: string;
    slogan: string;
    head_quaters: string;
    website: string;
    established: string;
}

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

type CardState = {
    totalTrips: number;
    totalAirlines: number;
    overallSales: number;
    oldestAirline: number;
}

export class Cards extends React.Component<unknown, CardState> {
    constructor(props: CardState) {
        super(props);
        this.state = {
            totalTrips: 0,
            totalAirlines: 0,
            overallSales: 0,
            oldestAirline: 0,
        };
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async componentDidMount() {
        const airlinesData: airlinesType[] = await ApiGet("https://api.instantwebtools.net/v1/airlines")
        const passenersData: passengerjsonType = await ApiGet("https://api.instantwebtools.net/v1/passenger")
        let totalTrips = 0
        let oldestAirline = 2020
        await passenersData.data.forEach((elt: { trips: number; })=>{
            if(typeof elt.trips === 'number'){
                totalTrips += elt.trips
            }
        })
        await airlinesData.forEach((elt: { established: string; }) => {
            if (typeof elt.established === 'string' && Number(elt.established) < oldestAirline) {
                oldestAirline = Number(elt.established)
            }
        })
        this.setState({ totalTrips });
        this.setState({ totalAirlines: airlinesData.length });
        this.setState({ overallSales: this.state.totalTrips * 199 });
        this.setState({ oldestAirline });
    }
    public render(): React.ReactNode {
        return (
            <div id="cards" className="Polaris-Page">
                <Card title="Total number of trips" sectioned>
                    <p>{this.state.totalTrips.toLocaleString()}</p>
                </Card>
                <Card title="Total number of airlines" sectioned>
                    <p>{this.state.totalAirlines}</p>
                </Card>
                <Card title="Overall sales in Euro" sectioned>
                    <p>€ {this.state.overallSales.toLocaleString()}</p>
                </Card>
                <Card title="Establishing year of the oldest airline" sectioned>
                    <p>{this.state.oldestAirline}</p>
                </Card>
            </div>
        );
    }
}

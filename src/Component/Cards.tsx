import * as React from 'react';
import { ApiGet } from './ApiGet';

type CardState = {
    totalTrips: number;
    totalAirlines: number;
    overallSales: number;
    oldestAirline: number;
}

export class Cards extends React.Component<{}, CardState> {
    constructor(props: CardState) {
        super(props);
        this.state = {
            totalTrips: 0,
            totalAirlines: 0,
            overallSales: 0,
            oldestAirline: 0,
        };
    }
    async componentDidMount() {
        const airlinesData: any = await ApiGet("https://api.instantwebtools.net/v1/airlines")
        const passenersData: any = await ApiGet("https://api.instantwebtools.net/v1/passenger")
        let totalTrips: number = 0
        let oldestAirline: number = 2020
        console.log(airlinesData)
        await passenersData.data.forEach((elt: { trips: number; })=>{
            if(typeof elt.trips === 'number'){
                totalTrips += elt.trips
            }
        })
        await airlinesData.forEach((elt: { established: number; }) => {
            console.log(elt.established)
            if (typeof elt.established === 'string' && Number(elt.established) < oldestAirline) {
                oldestAirline = Number(elt.established)
                console.log("@@@ old", oldestAirline)
            }
        })
        this.setState({ totalTrips });
        this.setState({ totalAirlines: airlinesData.length });
        this.setState({ overallSales: this.state.totalTrips * 199 });
        this.setState({ oldestAirline });
    }
    public render(): React.ReactNode {
        return (
            <div>
                <h1>Test</h1>
                <h1>total number of trips: {this.state.totalTrips}</h1>
                <h1>total number of airlines: {this.state.totalAirlines}</h1>
                <h1>Overall sales in Euro: {this.state.overallSales}</h1>
                <h1>Establishing year of the oldest airline: {this.state.oldestAirline}</h1>
            </div>
        );
    }
}

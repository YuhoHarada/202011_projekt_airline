import * as React from 'react';
import { Page, Card, Button, TextField, Form, FormLayout } from '@shopify/polaris';
import axios from 'axios';

type passengerType = {
    name: string;
    trips: number;
    airline: number;
}

export class AddPassenger extends React.Component<unknown, passengerType> {
    constructor(props: passengerType) {
        super(props);
        this.state = {
            name: "",
            trips: 0,
            airline: 1,
        };
    }
    handleNameChange = (event: string) => {
        this.setState({ name: event });
    }
    handleTripsChange = (event: string) => {
        this.setState({ trips: Number(event) });
    }
    handleAirlineChange = (event: string) => {
        this.setState({ airline: Number(event) });
    }
    handlePost = () => {
        console.log(this.state)
        axios.post('https://api.instantwebtools.net/v1/passenger', this.state)
            .then((response) => {
                console.log(response.data);
                this.setState({ name: "" });
                this.setState({ trips: 0 });
                this.setState({ airline: 1 });
            })
    }
    public render(): React.ReactNode {
        return (
            <div id="post">
                <Page title="Add New Passenger">
                    <Card>
                        <Form noValidate onSubmit={this.handlePost}>
                            <FormLayout>
                                <TextField
                                    value={this.state.name}
                                    onChange={(event)=>this.handleNameChange(event)}
                                    label="name"
                                />
                                <TextField
                                    value={String(this.state.trips)}
                                    onChange={(event) => this.handleTripsChange(event)}
                                    label="number of trips"
                                    type="number"
                                />
                                <TextField
                                    value={String(this.state.airline)}
                                    onChange={(event) => this.handleAirlineChange(event)}
                                    label="airline id"
                                    type="number"
                                />
                                <Button submit>Submit</Button>
                            </FormLayout>
                        </Form>
                    </Card>
                </Page>
            </div>
        );
    }
}

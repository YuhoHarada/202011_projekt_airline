import axios from 'axios';

type passengerType = {
    name: string;
    trips: number;
}

type jsonType = {
    totalPassengers: number;
    totalPages: number;
    data: passengerType[];
}

export const ApiGet = (async (url: string) => {
    try {
        const res = await axios.get<jsonType[]>(url);
        return res.data;
    } catch (err) {
        throw new Error(err.status);
    }
});

import axios from 'axios';

export const ApiGet = (async (url: string) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        throw new Error(err.status);
    }
});

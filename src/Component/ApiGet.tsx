import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ApiGet = (async (url: string) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        throw new Error(err.status);
    }
});

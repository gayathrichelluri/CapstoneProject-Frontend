import axios from 'axios';

const baseUrl = '/users';

export const register = async ({path, data}) => {
    try {
        return await axios.post(`${baseUrl}${path}`, data);
    } catch (e) {
        console.log(e);
        throw e;
    }
}
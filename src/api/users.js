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

export const getUser = async(id, accessToken) => {
    try {
        return (await axios.get(`${baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })).data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getUserAppointments = async ({id, accessToken}) => {
    try {
        return (await axios.get(`${baseUrl}/${id}/appointments`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        })).data;
    } catch (e) {
        return e;
    }
}
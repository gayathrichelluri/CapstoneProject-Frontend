import axios from 'axios';

const baseUrl = '/appointments';

export const postAppointments = async ({data, accessToken}) => {
    try {
        return (await axios.post(`${baseUrl}`, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        }));
    } catch (e) {
        return e;
    }
}
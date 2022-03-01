import axios from 'axios';

const baseUrl = '/doctors';

export const getDoctors = async ({param}) => {
    try {
        const url = param ? `${baseUrl}?speciality=${param}` : `${baseUrl}`
        return (await axios.get(url)).data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getSpecialities = async () => {
    try {
        return (await axios.get(`${baseUrl}/speciality`)).data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
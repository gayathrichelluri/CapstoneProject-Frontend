import axios from 'axios';

const baseUrl = '/auth';

export const login = async ({path, accessToken}) => {
    try {
        return await axios.post(`${baseUrl}${path}`, {}, {
            headers: {
                'Authorization': accessToken
            },
        });
    } catch(e) {
        console.log(e);
        throw e;
    }
}

export const logout = async ({path, accessToken}) => {
    try {
        return await axios.post(`${baseUrl}${path}`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    } catch(e) {
        console.log(e);
        throw e;
    }
}
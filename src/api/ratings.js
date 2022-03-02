import axios from 'axios';

const baseUrl = '/ratings';

export const postRating = async ({data, accessToken}) => {
    try {
        return await axios.post(`${baseUrl}`, data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}


import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj);
    return request.then(response => response.data);
};

const exportObject = { getAll, setToken, create, update };

export default exportObject;
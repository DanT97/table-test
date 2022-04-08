/* eslint-disable */
import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getClients() {
        return apiClient.get('/DanT97/table-test/clients')
    }
}
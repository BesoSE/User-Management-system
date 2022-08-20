import axios  from 'axios'

const createApiClient = () => {
    const client = axios.create({
        baseURL: process.env.backendApiHost
    })
    return client;
}

export function getApiClient() {
        const apiClient = createApiClient();
        return apiClient;
}

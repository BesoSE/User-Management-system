import {getApiClient} from "./utils";

export default function userAPI() {
    return {
        getUsers: async () =>
            getApiClient().get('/api/users/'),
        deleteUser: async (id) =>
            getApiClient().delete(`/api/user/${id}`),
        createUser: async (first_name, last_name, email, password, username) =>
            getApiClient().post('/api/user/',
                {
                    first_name,
                    last_name,
                    email,
                    password,
                    username
                },
            ),
        editUser: async (id, data) =>
            getApiClient().put(`/api/user/${id}`,
                data,
            ),
        getUser: async (id) =>
            getApiClient().get(`/api/user/${id}`),
    }
}
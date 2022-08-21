import {getApiClient} from "./utils";

export default function userAPI() {
    return {
        getUsers: async (limit, offset, sorting='', filtering='') =>
            getApiClient().get(`/api/users/?limit=${limit}&offset=${offset}${sorting}${filtering}`),
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
        getUserPermissions: async (id) =>
            getApiClient().get(`/api/user/permission/${id}`),
        deleteUserPermission: async (permission_id, id) =>
            getApiClient().delete(`/api/user/permission/${id}/${permission_id}`),
        addUserPermission: async (permission_id, id) =>
            getApiClient().post(`/api/user/permission/${id}/${permission_id}`),
    }
}
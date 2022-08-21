import {getApiClient} from "./utils";

export default function userAPI() {
    return {
        getUsers: async () =>
            getApiClient().get('/api/users/'),
        deleteUser: async (id) =>
            getApiClient().delete(`/api/user/${id}`),
    }
}
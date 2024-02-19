import { AxiosResponse } from "axios";
import apiClient, { AxiosError, CanceledError } from "./api-client";
import HttpService from "./http-service";
export interface User {
    id: number;
    name: string;
}
// class UserService {

//     //create
//     async addUser(newUser: User) {
//         return await apiClient.post("/users", newUser);
//     }
//     //retieve
//     getAllUsers() {
//         const controller = new AbortController();
//         const fetchUsers = async () => {

//             let res = await apiClient.get<User[]>("/users", {
//                 signal: controller.signal,
//             });
//             return res;
//         };
//         return { fetchUsers, controller }
//     }

//     //update
//     async updateUser(user: User, updatedUser: User) {
//         return await apiClient.patch("/users/" + user.id, updatedUser);
//     }

//     //delete
//     async deleteUser(user: User) {
//         return await apiClient.delete("/users/" + user.id);
//     }




// }

export default new HttpService('/users');
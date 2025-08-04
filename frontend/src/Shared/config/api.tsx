import axiosInstance from './axiosInstance';

export const login = (data: { username: string, password: string}) => {
    return axiosInstance.post ('./auth/login', data);
};

export const register = (data: { username: string, password: string}) => {
    return axiosInstance.post ('./auth/register', data);
};

export const getUserList = () => { 
    return axiosInstance.get ('http://localhost:3000/api/user/list');
};

export const searchUserApi = (username: string, role?: string) => {
    let query = `username=${username}`;
    if (role) {
        query += `&role=${role}`;
    }
    return axiosInstance.get(`/user/search?${query}`);
};
// export const setUserList = () => {
//     return axiosInstance.get ('./user/list');
// };



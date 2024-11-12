import axios from "axios";

const API_URL= process.env.NEXT_PUBLIC_API_URL

interface UserData {
    userEmail: string,
    userPassword: string;
    userName?: string
}

export const loginUser = async (userData: UserData) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email: userData.userEmail,
        password: userData.userPassword
    })
    return response.data
}

export const addUser = async (userData: UserData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
        email: userData.userEmail,
        password: userData.userPassword,
        name: userData.userName
    })
    return response.data
}
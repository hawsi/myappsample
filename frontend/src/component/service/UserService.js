import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async login(email, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            return response.data;
        }catch(err){
            throw err;
        }
    }

    // only want admin to be able to register users. It's an User's Management Portal. We have admin who manages users. More like an enterise organization unboarding and managing her users
    static async register(userData, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData ,
            {
                    headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`,
            {   
                 headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`,
            {   
                 headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`,
            {   
                 headers: {Authorization: `Bearer ${token}`} 

            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`,
            {   
                 headers: {Authorization: `Bearer ${token}`} 

            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {   
                 headers: {Authorization: `Bearer ${token}`} 

            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER*/
    /* Who is currently login user or admin or anyone*/
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    /* It will return true if there is a token, it will return false if there is no token*/
    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    /* If the role is ADMIN it will return true or It will return false */
    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    /* --- baanu error
     If the role is ADMIN it will return true or It will return false 
    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }
    */

    
    /* If the role is USER it will return true or It will return false */
    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    /* If the role is ADMIN it will return true or It will return false */
    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;


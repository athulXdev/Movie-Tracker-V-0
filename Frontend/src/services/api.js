import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:4000/api/v0',
    withCredentials:true,
    headers:{
        'Content-Type' : 'application/json'
    }
})

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status === 401){
            console.warn('Unauthorized — session may have expired');
            window.location.href = '/login';
        }
        return Promise.reject(error)
    }
)

export default api;
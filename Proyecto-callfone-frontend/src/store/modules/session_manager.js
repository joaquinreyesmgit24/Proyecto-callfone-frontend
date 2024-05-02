import axios from "axios"
import BASE_URL from "../../api/api.js"
const state ={
    auth_token: null,
    user: {
        id: null,
        nombre: null,
        rol:{
            id:null,
            nombre:null
        }
    }
};
const getters = {
    getAuthToken(state){
        return state.auth_token
    },
    getUsername(state){
        if(!state.user.nombre){
            state.user.nombre = JSON.parse(localStorage.getItem('user')).nombre
        }
        return state.user.nombre
    },
    getUserID(state){
        if(!state.user.id){
            state.user.id = JSON.parse(localStorage.getItem('user')).id
        }
        return state.user.id
    },
    getRolId(state){
        if(!state.user.rol.id){
            state.user.rol.id = JSON.parse(localStorage.getItem('user')).rol.id
        }
        return state.rol.id
    },
    getRolName(state){
    if(!state.user.rol.nombre){
        state.user.rol.nombre = JSON.parse(localStorage.getItem('user')).rol.nombre
    }
    return state.user.rol.nombre
    },  
    isLoggedIn(state){
        const loggedOut = state.auth_token === null || state.auth_token == JSON.stringify(null)
        return !loggedOut
    },
    haveToken(){
        const auth_token = localStorage.getItem('auth_token')
        const authTokenExists = auth_token !== 'undefined' && auth_token !== null
        return authTokenExists
    }
}
const actions = {
    registerUser({ commit }, payload){
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/registro`, payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    loginUser({ commit }, payload){
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/autenticar`, payload)
            .then(response => {
                commit('setUserInfo', response)
                resolve(response);
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    logoutUser({ commit }){
        new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/cerrar-sesion`)
            .then(response => {
                commit('resetUserInfo', response)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    resetPasswordUser({ commit }, payload){
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/olvide-password`, payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    checkTokenUser({commit}, token){
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/auth/olvide-password/${token}`)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        });
    },
    newPasswordUser({ commit },{token, payload}){
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/auth/olvide-password/${token}`, payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        });
    },
}
const mutations = {
    setUserInfo(state, data){
        state.user.id = data.data.detalles.id
        state.user.nombre = data.data.detalles.nombre
        state.auth_token = data.data.detalles.token
        state.user.rol.id = data.data.detalles.rol.id
        state.user.rol.nombre = data.data.detalles.rol.nombre
        localStorage.setItem('auth_token', data.data.detalles.token)
        localStorage.setItem('user', JSON.stringify(data.data.detalles))
    },
    resetUserInfo(state, data){
        state.user = {
                id: null,
                nombre: null,
                rol:{
                    id:null,
                    nombre:null
                }
        }

        state.auth_token = null
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
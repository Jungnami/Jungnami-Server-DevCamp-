import axios from 'axios'

const baseURI = 'http://localhost:3200';
const instance = axios.create({
    baseURL: baseURI,
    timeout: 30000
})

// var config = {
//     headers: { 'Content-Type': 'application/json' }
//   };

export const optionActions = {
    getOptions ({ commit }, payload) {
        instance.get('/pms').then(response => {
            console.log(response.data)
            commit('getOptionSuccess', response.data.data)
        }).catch(error => {
            // error 
        })
    },

    submitOptions ({ commit }, payload) {
        instance.post('/pms/search', payload).then(response => {
            console.log(response.data)
            commit('postOptionSuccess', response.data.data)
        }).catch(error => {
            console.log(error)
        })
    },

    getDetails({ commit }, payload) {
        instance.get('/detail/:idx', {params: { idx: getTotals.idx }}, payload).then(response => {
            console.log(response.data)
            commit('getDetailSuccess', response.data.data)
        }).catch(error => {
            
        })
    },

    updateDetail({ commit }, payload){
        instance.put('/update/:idx', payload).then(response => {
            console.log(response.data)
            commit('updateDetailSuccess', response.data.data)
        }).catch(error => {

        })
    }
}
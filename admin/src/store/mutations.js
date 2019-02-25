export const optionMutations = {
    getOptionSuccess (state, payload) {
        state.parties = payload[0],
        state.cities = payload[1],
        state.ordinals = payload[2],
        state.totals = payload[3]
        console.log(state.totals)
    },
    
    postOptionSuccess (state, payload) {
        state.results = payload
    },

    getDetailSuccess (state, payload) {
        state.details = payload
        console.log(state.details)
    },

    updateDetailSuccess (state, payload) {
        state.details = payload
        console.log(state.detals)
    }
}
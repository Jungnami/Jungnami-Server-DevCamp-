export const optionMutations = {
    getOptionSuccess (state, payload) {
        state.parties = payload[0],
        state.cities = payload[1],
        state.ordinals = payload[2],
        // state.crimes = payload[3]
        // state.idxs = payload[3].idx,
        // state.names = payload[3].legi_name,
        // state.profileImgs = payload[3].profile_img
        state.totals = payload[3]
        // console.log(state.idxs)
    },
    
    postOptionSuccess (state, payload) {
        // state.idxs = payload.idx,
        // state.names = payload.legi_name,
        // state.ordinals = payload.ordinal,
        // state.profileImgs = payload.profile_img
        state.results = payload
        console.log(state.results)
    }
}
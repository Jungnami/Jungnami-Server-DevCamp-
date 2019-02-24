export const optionMutations = {
    getOptionSuccess (state, payload) {
        state.parties = payload[0],
        state.cities = payload[1],
        state.ordinals = payload[2],
        state.crimes = payload[3]
    },
    
    postOptionSuccess (state, payload) {
        state.idxs = payload.idx,
        state.names = payload.legi_name,
        state.ordinals = payload.ordinal,
        state.profileImgs = payload.profile_img
    }
}
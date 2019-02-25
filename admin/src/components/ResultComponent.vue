<template>
    <v-dialog v-model="detailPage">
        <v-btn ></v-btn>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Detail',
    data: () => {
        return {

        }
    },
    computed: {
        ...mapGetters({
            names: 'getLegiNames', 
            parties: 'getParties', 
            cities: 'getCities', 
            ordinals: 'getOrdinals', 
            profileImgs: 'getProfileImgs', 
            reelections: 'getReelections', 
            crimes: 'getCrimes', 
            twitters: 'getTwitters', 
            facebooks: 'getFacebooks', 
            blogs: 'getBlogs', 
            phones: 'getPhones'
        }),
    },
    methods: {
        updateDetail() {

        }
    },
    created(){},
}
</script>
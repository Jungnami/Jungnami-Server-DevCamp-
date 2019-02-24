<template>
    <v-container>
        <v-layout fill-height>
            <!-- <v-layout row wrap> -->
            <fieldset name="search-result">
                <legend>검색 결과</legend>
                <v-if>
                    
                </v-if>
                    <!-- <v-flex v-for="idx in idxs" :key="`${i}`" xs1> -->
                        <!-- <v-card dark color="secondary">ㄹ -->
                        <!-- <v-card-text class="px-0">1</v-card-text> -->
                        <!-- </v-card> -->
                    <!-- </v-flex> -->
            </fieldset>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => {
        return {
        }
    },
    computed: {
        ...mapGetters({
            idxs: 'getIdxs',
            names: 'getNames',
            parties: 'getParties', 
            cities: 'getCities',
            ordinals: 'getOrdinals',
            crimes: 'getCrimes',
            profileImgs: 'getProfileImgs'
        }),
    },
    methods: {
        submitOptions() {
            this.$store.dispatch('submitOptions', {name: this.name, party: this.party, city: this.city, ordinal: this.ordinal, crime: this.crime})
        }
    },
    created ()  {
        this.$store.dispatch('getOptions')        //action 사용할 때 dispatch
    },
}
</script>
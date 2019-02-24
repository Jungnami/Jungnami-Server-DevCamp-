<template>
  <v-container>
    <h3 class="my-3">의원 검색</h3>
        <v-layout row wrap>
            <!-- <form @submit.prevent="submitOptions(name, party, city, ordinal, crime)"> -->
            <fieldset name="search-legislator">
                <legend>의원 검색</legend>
                    <input id="name" type="text" placeholder="이름을 입력하세요" >
                    <select v-model="party">
                    <option selected disabled>정당을 선택하세요</option>
                    <option v-for="party in parties" v-bind:key="party.party_cd">{{ party.party_name }}</option>
                    </select>
                    <select v-model="city">
                        <option selected disabled>지역을 선택하세요</option>
                        <option v-for="city in cities" v-bind:key="city.city_cd">{{ city.city_name }}</option>
                    </select>
                    <select v-model="ordinal"> 
                        <option selected disabled>당선대수를 선택하세요</option>
                        <option v-for="ordinal in ordinals" v-bind:key="ordinal.ordinal">{{ ordinal.ordinal }}</option>
                    </select>
                    <select v-model="crime">
                        <option selected disabled>범죄이력을 선택하세요</option>
                        <option v-bind:value="1">유</option>
                        <option v-bind:value="0">무</option>
                    </select>
                <button v-on:click="submitOptions">검색</button>
            </fieldset>
            <!-- </form> -->
        </v-layout>
        <v-spacer></v-spacer>
        <v-layout fill-height>
            <!-- <v-layout row wrap> -->
            <fieldset name="search-result">
                <legend>검색 결과</legend>
                    <v-flex v-for="i in 12" :key="`${i}`" xs1>
                        <v-card dark color="secondary">
                        <v-card-text class="px-0">1</v-card-text>
                        </v-card>
                    </v-flex>
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
            names: 'getNames',
            parties: 'getParties', 
            cities: 'getCities',
            ordinals: 'getOrdinals',
            crimes: 'getCrimes'
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
};
</script>

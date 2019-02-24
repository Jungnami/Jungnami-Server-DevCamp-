<template>
    <v-container>
    <div>
    <h3 class="my-3">의원 검색</h3>
        <v-layout row wrap>
            <!-- <form @submit.prevent="submitOptions(name, party, city, ordinal, crime)"> -->
            <fieldset name="search-legislator" style="width:100%">
                <legend>의원 검색</legend>
                    <input v-model="name" id="name" type="text" placeholder="이름을 입력하세요" >
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
                <v-btn v-on:click="submitOptions" sytle="float:right">검색</v-btn>
            </fieldset>
        </v-layout>
    </div>
    <template>
        <v-layout row wrap>
            <fieldset name="search-result-default" style="width:100%">
                <legend>검색 결과</legend>
                    <v-flex v-for="total in totals" :key="total.idx" xs100>
                        <v-card-media :src="total.profile_img" height="200px"></v-card-media>
                            <v-card-text>{{ total.legi_name }}</v-card-text>
                    </v-flex>
                <v-esle>
                </v-esle>
            </fieldset>
        </v-layout>
    </template>
    <div>
        <v-layout>
            <fieldset name="search-result-success">
                <legend>검색 결과</legend>
                <v-flex v-for="result in results" :key="result.idx" xs100>
                    <v-card-media :src="result.profile_img" height="200px"></v-card-media>
                    <v-card-text>{{ result.legi_name }}</v-card-text>
                </v-flex>
            </fieldset>
        </v-layout>
    </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
// import PmsResult from './components/PmsResultComponent'

export default {
    data: () => {
        return {
        }
    },
    computed: {
        ...mapGetters({
            parties: 'getParties', 
            cities: 'getCities',
            ordinals: 'getOrdinals',
            crimes: 'getCrimes',
            totals: 'getTotals',
            results: 'getResults'
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
    // components: {
    //     'PmsResultComponent': PmsResult
    // }
};
</script>

const request = require('sync-request');
const xml2json = require('xml2json');
const db = require('../module/pool');
const { serviceKey } = require('../config/api');
let { url } = require('../config/api');

module.exports = {
    party : async() => {
        url += 'getPolySearch';
        let queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + serviceKey;

        const response = await request('GET', url + queryParams);
        const json = JSON.parse(xml2json.toJson(response.body));
        const item = json.response.body.items.item;

        let party_name, party_cd;
        let result = new Array();

        for (let i in Object.keys(item)){
            result[i] = new Array();

            party_cd = JSON.stringify(item[i].polyCd).replace(/['"]+/g, '');
            party_cd = parseInt(party_cd);
            party_name = JSON.stringify(item[i].polyNm).replace(/['"]+/g, '');
           
            result[i].push(party_cd, party_name)
        }
        const insertQuery = 'INSERT INTO party VALUES ?';
        const insertResult = await db.queryParam_Parse(insertQuery, [result]);
        console.log(insertResult);
    }
}